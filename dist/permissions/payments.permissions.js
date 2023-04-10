"use strict";

var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
exports.scopedPayments = function (user, payments, orders) {
  var filteredPayments = [];
  if (user.role === _role["default"].Admin) return payments;
  for (var i = 0; i < orders.length; i++) {
    filteredPayments.push(payments.filter(function (payment) {
      return payment.orderId === orders[i].orderId;
    }));
  }
  return filteredPayments;
};