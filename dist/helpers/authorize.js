"use strict";

var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var jwt = require('express-jwt');
module.exports = authorize;
function authorize() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
  /*    // authenticate JWT token and attach user to request object (req.user)
      jwt({ secret, algorithms: ['HS256'] }), */

  // authorize based on user role
  function (req, res, next) {
    if (roles.length && !roles.includes(req.user.role)) {
      // user's role is not authorized
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    // authentication and authorization successful
    next();
  }];
}