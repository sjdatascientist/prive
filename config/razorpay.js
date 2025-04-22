require('dotenv').config()
const Razorpay = require('razorpay'); 

const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpay = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

// console.log(razorpay)
module.exports = razorpay;