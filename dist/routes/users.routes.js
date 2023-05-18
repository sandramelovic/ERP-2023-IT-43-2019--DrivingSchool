"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controllers/users.controller");
var _role = _interopRequireDefault(require("../helpers/role"));
var _users2 = require("../permissions/users.permissions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/users', _users.protect, (0, _users.authRole)(_role["default"].Admin), _users.getUsers);
router.get('/user/:id', _users.protect, authPutUser, _users.getUserById);
router.post('/user', _users.postUser);
router.put('/user/:id', _users.protect, authPutUser, _users.putUser);
router["delete"]('/user/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _users.deleteUser);
router.post('/login', _users.login);
router.post('/logout', _users.logout);
router.get("/free-endpoint", function (req, res) {
  res.json({
    message: "You are free to access me anytime"
  });
});
router.get('/auth-endpoint', _users.protect, function (req, res) {
  res.json({
    message: "You are authorized to access me"
  });
});
router.get('/admin', _users.protect, (0, _users.authRole)(_role["default"].Admin), _users.getUsers); // admin only

function authPutUser(req, res, next) {
  if (!(0, _users2.canViewUsers)(req.user, req.params.id)) {
    res.status(401);
    return res.send('Not Allowed');
  }
  next();
}
var _default = router;
exports["default"] = _default;