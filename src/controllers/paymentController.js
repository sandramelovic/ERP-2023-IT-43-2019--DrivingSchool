const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsyncErrors = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };

export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "rsd",
    metadata: {
      company: "AUTOSKOLA",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = async (req, res) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}