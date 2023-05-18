"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _users = require("../controllers/users.controller");
var _express = require("express");
var router = (0, _express.Router)();
var _require = require("../controllers/paymentController"),
  processPayment = _require.processPayment,
  sendStripeApiKey = _require.sendStripeApiKey;
router.post('/payment/process', _users.protect, processPayment);
router.get('/stripeapikey', sendStripeApiKey);
var _default = router;
exports["default"] = _default;