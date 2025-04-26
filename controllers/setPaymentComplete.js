const {supabase} = require('../config/supabase')
const getUserID = require('../utils/getUserID')
const getCarID = require('../utils/getCarID')
const getBookingID = require('../utils/getBookingID')

// Patch request
const setPaymentComplete = async (req, res) => {
	const userData = req.body
    
	const userID = await getUserID(userData.email)
	const carID = await getCarID(userData.car)
	const bookingID = await getBookingID(userID, carID, userData.tickets)

	const {data, error} = await supabase.from('bookings').update({payment_status: 'Completed'}).eq('booking_id', bookingID).select()

	if (error) {
		console.error('Error inserting data:', error)
	} else {
		console.log(data)
	}
}

module.exports = setPaymentComplete
