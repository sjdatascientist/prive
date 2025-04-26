const {supabase} = require('../config/supabase')
const getUserID = require('../utils/getUserID')
const getCarID = require('../utils/getCarID')

const saveBookingData = async (req, res) => {
	const userData = req.body

	const userID = await getUserID(userData.email)
	const carID = await getCarID(userData.car)

	// Adding data to bookings table
	async function isSameBookingExist(userID, carID) {
		const response = await supabase
			.from('bookings')
			.select('*')
			.match({
				user_id: userID,
				car_id: carID,
				city: userData.city,
				num_memberships: userData.tickets,
				amount: 10000 * userData.tickets,
			})
			.select()
		const data = response.data[0]
		if (data) {
			console.log('Same Booking Already Exist With Record:', data)
			// Fetch existing booking_id
			const bookingID = data.booking_id
			// 409 Conflict Error
			res.status(409).json({
				"message": 'Record Conflict! Same Booking Already Exist',
				"record": data,
				"booking_id": bookingID,
			})
		} else {
			// Booking Does Not Exist! Let's save to DB
			const {data, error} = await supabase
				.from('bookings')
				.insert([
					{
						user_id: userID,
						car_id: carID,
						city: userData.city,
						num_memberships: userData.tickets,
						amount: 10000 * userData.tickets,
					},
				])
				.select()

			if (error) {
				console.log('Error inserting Booking Data:', error)
			} else {
				console.log('New Booking Data Saved Successfully: ', data)
			}
		}
	}

	isSameBookingExist(userID, carID)
}

module.exports = saveBookingData
