"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _programs = _interopRequireDefault(require("./routes/programs.routes"));
var _programTypes = _interopRequireDefault(require("./routes/programTypes.routes"));
var _categories = _interopRequireDefault(require("./routes/categories.routes"));
var _instructors = _interopRequireDefault(require("./routes/instructors.routes"));
var _orders = _interopRequireDefault(require("./routes/orders.routes"));
var _orderItems = _interopRequireDefault(require("./routes/orderItems.routes"));
var _vehicles = _interopRequireDefault(require("./routes/vehicles.routes"));
var _payments = _interopRequireDefault(require("./routes/payments.routes"));
var _users = _interopRequireDefault(require("./routes/users.routes"));
var _errorHandler = _interopRequireDefault(require("./helpers/error-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

//settings
app.set('port', _config["default"].port);

//middlewares
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_programs["default"]);
app.use(_programTypes["default"]);
app.use(_categories["default"]);
app.use(_instructors["default"]);
app.use(_orders["default"]);
app.use(_orderItems["default"]);
app.use(_vehicles["default"]);
app.use(_payments["default"]);
app.use(_users["default"]);
app.use(_errorHandler["default"]);
var _default = app;
exports["default"] = _default;