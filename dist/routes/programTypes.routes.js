"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _programTypes = require("../controllers/programTypes.controlles");
var _users = require("../controllers/users.controller");
var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/programTypes', _programTypes.getProgramTypes);
router.get('/programType/:id', _programTypes.getProgramTypeById);
router.post('/programType', _users.protect, (0, _users.authRole)(_role["default"].Admin), _programTypes.postProgramType);
router.put('/programType/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _programTypes.putProgramType);
router["delete"]('/programType/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _programTypes.deleteProgramType);
var _default = router;
exports["default"] = _default;