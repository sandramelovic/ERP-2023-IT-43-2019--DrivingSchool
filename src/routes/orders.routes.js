import { Router } from "express";
import { getConnection} from "../database"
import { getOrderById, getOrders, postOrder, putOrder, deleteOrder, getAllOrders, orders } from "../controllers/orders.controller";
import {canViewOrders, scopedOrders, canDeleteOrders} from '../permissions/orders.permissions'
import {protect, authorize, authRole } from "../controllers/users.controller";
import { getUserById } from "../controllers/users.controller";

const router = Router()

router.get('/orders', protect, (req, res) => {
    getAllOrders().then(orders => { 
        res.json(scopedOrders(req.user, orders))
    });
  })
router.get('/order/:id', setOrder, protect, authGetOrder, getOrderById)
router.post('/order', protect, postOrder)
router.put('/order/:id', setOrder, protect, authDeleteOrder, putOrder)
router.delete('/order/:id', setOrder, protect, authDeleteOrder, deleteOrder)


async function setOrder(req, res, next) {
    const result = await (await getConnection())
            .request()
            .query(
                `SELECT * FROM Orders WHERE orderId = '${req.params.id}'`
            );
    const order = result.recordset[0];
    if (!order) {
        res.status(404)
        return res.send('Order not found')
    }
    req.order = order
    res.locals.order = order;
    
  next()
}

function authGetOrder(req, res, next) {
  if (!canViewOrders(req.user, req.order)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

 function authDeleteOrder (req, res, next) {
    
    if (!canDeleteOrders(req.user, req.order)) {
      res.status(401)
      return res.send('Not Allowed')
    }
  
    next()
  }

export default router