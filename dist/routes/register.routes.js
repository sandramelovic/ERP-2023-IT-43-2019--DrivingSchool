"use strict";

var express = require('express');
var router = express.Router();
var registerController = require('../controllers/register.controller');
router.post('/', registerController.handleNewUser);
module.exports = router;