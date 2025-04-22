const crypto = require('crypto')

const razorpayWebhook = (req, res) => {
	const received_signature = req.headers['x-razorpay-signature']
	const body = JSON.stringify(req.body)

	const expected_signature = crypto.createHmac('sha256', razorpay.key_secret).update(body).digest('hex')

	if (received_signature === expected_signature) {
		// Payment captured event
		if (req.body.event === 'payment.captured') {
			const paymentId = req.body.payload.payment.entity.id
			const orderId = req.body.payload.payment.entity.order_id
			const amount = req.body.payload.payment.entity.amount

			// Update your database here
			console.log(`Payment ${paymentId} for order ${orderId} of ${amount} captured`)
		}
		res.status(200).send('OK')
	} else {
		res.status(400).send('Invalid signature')
	}
}

module.exports = razorpayWebhook
