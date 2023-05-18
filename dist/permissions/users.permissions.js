"use strict";

var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
exports.canViewUsers = function (user, userId) {
  return user.role === _role["default"].Admin || userId == user.userId;
};