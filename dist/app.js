"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
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
var _paymentRoute = _interopRequireDefault(require("./routes/paymentRoute"));
var _supportChat = _interopRequireDefault(require("./routes/supportChat.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  accessControlAllowCredentials: true,
  optionSuccessStatus: 200
};

//settings
app.set('port', _config["default"].port);

//middlewares
app.use((0, _cors["default"])(corsOptions));
//app.use(express.json())
app.use(_express["default"].json({
  limit: '5mb',
  verify: function verify(req, res, buf) {
    req.rawBody = buf.toString();
  }
}));
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
app.use(_paymentRoute["default"]);
app.use(_errorHandler["default"]);
app.use(_supportChat["default"]);
var _default = app;
exports["default"] = _default;