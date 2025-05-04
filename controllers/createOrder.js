const path = require('path')
const fs = require('fs')
const razorpay = require('../config/razorpay')

const createOrder = async (req, res) => {
	let {name, email, phone, city, car, tickets, fuel} = req.body

	let plan = ''
	const totalAmount = tickets * 10000
	if (totalAmount === 10000) {
		plan = 'Silver'
	} else if (totalAmount === 20000) {
		plan = 'Gold'
	} else if (totalAmount === 30000) {
		plan = 'Platinum'
	}

	const options = {
		amount: tickets * 10000 * 100,
		currency: 'INR',
		notes: {
			Order_Created_At: Date.now(),
			Name: name,
			Email: email,
			Phone: '+91' + phone,
			City: city,
			No_of_Memberships: tickets,
			Plan: plan,
			Car: car,
			Fuel: fuel,
		},
	}

	try {
		const response = await razorpay.orders.create(options)
		const filepath = path.join(__dirname, '../data/order.json')
		fs.writeFileSync(filepath, JSON.stringify(response, null, 2))
		res.json(JSON.stringify(response, null, 2)).end()
	} catch (error) {
		console.error(error)
		res.send('Error creating order').end()
	}
}

module.exports = createOrder
