"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _programs = require("../controllers/programs.controller");
var _users = require("../controllers/users.controller");
var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/programs', _programs.getPrograms);
router.get('/programs/:id', _programs.getProgramById);
router.post('/programs', _users.protect, (0, _users.authRole)(_role["default"].Admin), _programs.postProgram);
router.put('/programs/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _programs.putProgram);
router["delete"]('/programs/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _programs.deleteProgram);
var _default = router;
exports["default"] = _default;