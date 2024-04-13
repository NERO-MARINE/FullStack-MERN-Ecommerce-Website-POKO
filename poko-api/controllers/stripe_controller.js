const stripe = require("stripe")(process.env.STRIPE_KEY);

const makePayment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId, // this will come from the react app. Stripe  payment implementation is done both in the frontend and backend
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

module.exports = {
  makePayment,
};
