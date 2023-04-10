import { Router } from "express";
import { getConnection } from "../database"
import { getOrderItemById, getOrderItems, postOrderItem, putOrderItem, deleteOrderItem, getAllOrderItems } from "../controllers/orderItems.controller";
import { getAllOrders } from "../controllers/orders.controller";
import { protect, authorize, authRole } from "../controllers/users.controller";
import Role from "../helpers/role"
import { scopedOrderItems } from '../permissions/orderItems.permissions'
import { canViewOrders, canDeleteOrders, scopedOrders } from '../permissions/orders.permissions'

const router = Router()

router.get('/orderItems', protect, (req, res) => {
  getAllOrders().then(orders => {
    getAllOrderItems().then(orderItems => {
      res.json(scopedOrderItems(req.user, orderItems, scopedOrders(req.user, orders)))
    });
  });
})
router.get('/orderItem/:id', setOrder, protect, authGetOrderItems, getOrderItemById)
router.post('/orderItem', protect, postOrderItem)
router.put('/orderItem/:id', protect, authRole(Role.NoOneCan), putOrderItem)
router.delete('/orderItem/:id', setOrder, protect, authDeleteOrderItems, deleteOrderItem)

async function setOrder(req, res, next) {
  const result = await (await getConnection())
    .request()
    .query(
      `SELECT * FROM Orders o join OrderItem oi on o.orderId = oi.orderId WHERE orderItemId = '${req.params.id}'`
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


function authGetOrderItems(req, res, next) {
  if (!canViewOrders(req.user, req.order)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

function authDeleteOrderItems(req, res, next) {

  if (!canDeleteOrders(req.user, req.order)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}



export default router