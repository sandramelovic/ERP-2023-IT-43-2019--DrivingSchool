import Role from "../helpers/role"

exports.scopedPayments = function (user, payments, orders
) {
  let filteredPayments = []
  if (user.role === Role.Admin) return payments
  for (var i = 0; i < orders.length; i++) {
    filteredPayments.push(payments.filter(payment => payment.orderId === orders[i].orderId))
  }
  return filteredPayments

}
