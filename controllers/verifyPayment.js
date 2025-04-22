const crypto = require('crypto')
const razorpay = require("../config/razorpay")

const verifyPayment = (req, res) => {
	const {order_id, payment_id,  signature} = req.body
	
	const generated_signature = crypto
		.createHmac('sha256', razorpay.key_secret)
		.update(order_id + '|' + payment_id)
		.digest('hex')

	if (generated_signature ===  signature) {
		res.json({success: true, message: 'Payment verified successfully'})
	} else {
		res.status(400).json({success: false, message: 'Invalid signature'})
	}
}

module.exports = verifyPayment