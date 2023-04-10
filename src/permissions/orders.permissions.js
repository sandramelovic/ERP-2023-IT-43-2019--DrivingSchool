import Role from "../helpers/role"

exports.canViewOrders = function(user, order) {
  return (
    user.role === Role.Admin ||
    order.userId === user.userId
  )
}

exports.scopedOrders = function(user, orders) {
  if (user.role === Role.Admin) return orders
  return orders.filter(order => order.userId === user.userId)
}

exports.canDeleteOrders = function(user, order) {
  return order.userId === user.userId
}
