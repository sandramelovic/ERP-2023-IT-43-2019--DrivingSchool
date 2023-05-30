import { protect } from "../controllers/users.controller";
import { Router } from "express";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var express = require('express');
var router = express.Router();
//const router = Router()
import { setCategory, setProgramType } from "../../ERP_DrivingSchool_Frontend/src/redux/actions/categoryActions";
import { postOrder } from "../controllers/orders.controller";
import axios from 'axios'

const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const createOrder = async (customer, data) => {
  const url = "http://localhost:4000/order"; // Replace with the actual endpoint URL

  const headers = {
    Authorization: `Bearer ${customer.metadata.token}`,
  };

  const Items = JSON.parse(customer.metadata.cart);
  const products = Items.map((item) => {
    return {
      productId: item.programId,
    };
  });

  const newOrder = {
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  };
  console.log("newOrder", newOrder.payment_status)


  const order = {
    userId: newOrder.userId,
    total: newOrder.total,
    date: new Date().toISOString().split("T")[0],
    subtotal: newOrder.subtotal,
    shipping: JSON.stringify(newOrder.shipping),
    payment_status: newOrder.payment_status,
  };


  try {
    const response = await axios.post(url, order, {
      headers: headers,
    }).then(async (res) => {
      await Promise.all(
        Items.map(async (item) => {
          await axios.post("http://localhost:4000/orderItem", {
            amount: item.price,
            programId: item.programId,
            orderId: res.data.orderId,
          }, {
            headers: headers,
          });
        })
      );
    
    })
    console.log("Order saved successfully.");
  } catch (error) {
    console.error("Failed to save the order:", error);
  }

};


router.post('/order/confirm', async (req, res) => {
  const updatedCartItems = req.body.cartItems.map(({ description, ...rest }) => rest);

  const customer = await stripe.customers.create({
    metadata: {
      token: req.body.token,
      userId: req.body.userId.toString(),
      cart: JSON.stringify(updatedCartItems)
    }
  })

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "rsd",
        product_data: {
          name: `${setCategory(item.categoryId)} - ${setProgramType(item.programTypeId)}`,
          images: [item.programImage],
          description: item.description,
          metadata: {
            id: item.programId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "rsd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 34000,
            currency: "rsd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url, newOrder: createOrder.newOrder });
});



router.get('/stripeapikey', sendStripeApiKey);

// STRIPE WEBHOOK

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

endpointSecret = "whsec_18203a60a2ce4c65f05a1b451234d7543bf8535d600f8db18c06ae84f5afdf87";

router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];


  let data;
  let eventType;

  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
      console.log('WEBHOOK VERIFIED')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)

      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;

  } else {
    data = req.body.data.object;
    eventType = req.body.type
  }


  // Handle the event

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then(async (customer) => {
      try {
        // CREATE ORDER
        await createOrder(customer, data)
      } catch (err) {
        console.log(typeof createOrder);
        console.log(err);
      }
    })
      .catch((err) => console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

export default router