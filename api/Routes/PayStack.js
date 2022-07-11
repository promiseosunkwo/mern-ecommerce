const { route } = require("./user");

const Route = require("express").Router();
const Paystack = require("paystack")(process.env.PAYSTACK_KEY);

route.post("/payment", ( req, res )=> {
    Paystack.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency: "usd",
    }, (PaystackErr, PaystackRes )=> {
        if (PaystackErr) {
            res.status(500).json(PaystackErr);
        }else{
            res.status(200).json(PaystackRes);
        }
    });

});


module.exports = Route