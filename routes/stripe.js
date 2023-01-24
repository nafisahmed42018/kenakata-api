const router = require('express').Router();
// const stripe = require('stripe')(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
const stripe = require('stripe')(
  'sk_test_51MRr7wHrfJgSm0P7UN4c3sl4IRGwWEYY3pZlSlWkmzSLgCgROOLcs46vLKQRl0lN5GA6hDJrqEXR4T80SxappPd200WeG0bJPx'
);

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'BDT',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
