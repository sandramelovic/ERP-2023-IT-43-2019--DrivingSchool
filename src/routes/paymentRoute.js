import {protect } from "../controllers/users.controller";
import { Router } from "express";

const router = Router()

const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");


router.post('/payment/process', protect, processPayment);

router.get('/stripeapikey', sendStripeApiKey);

export default router