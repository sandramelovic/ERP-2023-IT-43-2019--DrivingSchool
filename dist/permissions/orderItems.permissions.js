"use strict";

var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
exports.scopedOrderItems = function (user, orderItems, orders) {
  var filteredOrderItems = [];
  if (user.role === _role["default"].Admin) return orderItems;
  for (var i = 0; i < orders.length; i++) {
    filteredOrderItems.push(orderItems.filter(function (orderItem) {
      return orderItem.orderId === orders[i].orderId;
    }));
  }
  return filteredOrderItems;
};