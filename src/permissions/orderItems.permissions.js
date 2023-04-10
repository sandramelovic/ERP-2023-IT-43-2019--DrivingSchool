import Role from "../helpers/role"

exports.scopedOrderItems = function (user, orderItems, orders
) {
  let filteredOrderItems = []
  if (user.role === Role.Admin) return orderItems
  for (var i = 0; i < orders.length; i++) {
    filteredOrderItems.push(orderItems.filter(orderItem => orderItem.orderId === orders[i].orderId))
  }
  return filteredOrderItems

}


