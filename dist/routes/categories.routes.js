"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _categories = require("../controllers/categories.controller");
var _users = require("../controllers/users.controller");
var _role = _interopRequireDefault(require("../helpers/role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/categories', _categories.getCategories);
router.get('/category/:id', _categories.getCategoryById);
router.post('/category', _users.protect, (0, _users.authRole)(_role["default"].Admin), _categories.postCategory);
router.put('/category/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _categories.putCategory);
router["delete"]('/category/:id', _users.protect, (0, _users.authRole)(_role["default"].Admin), _categories.deleteCategory);
var _default = router;
exports["default"] = _default;