"use strict";

var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
exports.canViewOrders = function (user, order) {
  return user.role === _role["default"].Admin || order.userId === user.userId;
};
exports.scopedOrders = function (user, orders) {
  if (user.role === _role["default"].Admin) return orders;
  return orders.filter(function (order) {
    return order.userId === user.userId;
  });
};
exports.canDeleteOrders = function (user, order) {
  return order.userId === user.userId;
};