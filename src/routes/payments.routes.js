import { Router } from "express";
import { getConnection } from "../database"
import { getPaymentById, getPayments, postPayment, putPayment, deletePayment, getAllPayments } from "../controllers/payments.controller";
import {protect, authorize, authRole } from "../controllers/users.controller";
import { getAllOrders } from "../controllers/orders.controller";
import Role from "../helpers/role"
import {scopedPayments} from '../permissions/payments.permissions'
import { canViewOrders, canDeleteOrders, scopedOrders } from '../permissions/orders.permissions'

const router = Router()

router.get('/payments', protect, (req, res) => {
    getAllOrders().then(orders => { 
        getAllPayments().then(payments => {
            res.json(scopedPayments(req.user, payments, scopedOrders(req.user, orders)))
          });
    });
  })
router.get('/payment/:id', setOrder, protect, authGetPayment, getPaymentById)
router.post('/payment', protect, postPayment)
router.put('/payment/:id', protect, authRole(Role.NoOneCan), putPayment)
router.delete('/payment/:id', protect, authRole(Role.Admin), deletePayment)

async function setOrder(req, res, next) {
    const result = await (await getConnection())
      .request()
      .query(
        `SELECT * FROM Payment p join Orders o on p.orderId = o.orderId WHERE paymentId = '${req.params.id}'`
      );
    const order = result.recordset[0];
    if (!order) {
      res.status(404)
      return res.send('Payment not found')
    }
    req.order = order
    res.locals.order = order;
  
    next()
  }

  function authGetPayment(req, res, next) {
    if (!canViewOrders(req.user, req.order)) {
      res.status(401)
      return res.send('Not Allowed')
    }
  
    next()
  }

export default router