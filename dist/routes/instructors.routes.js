"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _instructors = require("../controllers/instructors.controller");
var _users = require("../controllers/users.controller");
var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/instructors', _instructors.getInstructors);
router.get('/instructor/:id', _instructors.getInstructorById);
router.post('/instructor', _users.protect, (0, _users.authRole)(_role["default"].Admin), _instructors.postInstructor);
router.put('/instructor/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _instructors.putInstructor);
router["delete"]('/instructor/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _instructors.deleteInstructor);
var _default = router;
exports["default"] = _default;