"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _vehicles = require("../controllers/vehicles.controlles");
var _users = require("../controllers/users.controller");
var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/vehicles', _vehicles.getVehicles);
router.get('/vehicle/:id', _vehicles.getVehicleById);
router.post('/vehicle', _users.protect, (0, _users.authRole)(_role["default"].Admin), _vehicles.postVehicle);
router.put('/vehicle/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _vehicles.putVehicle);
router["delete"]('/vehicle/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _vehicles.deleteVehicle);
var _default = router;
exports["default"] = _default;