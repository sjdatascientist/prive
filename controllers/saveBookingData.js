const {supabase} = require('../config/supabase')
const getUserID = require('../utils/getUserID')
const getCarID = require('../utils/getCarID')

const saveBookingData = async (req, res) => {
	const userData = req.body

	const userID = await getUserID(userData.email)
	const carID = await getCarID(userData.car)

	let plan
	const totalAmount = userData.tickets * 10000
	if (totalAmount === 10000) {
		plan = 'Silver'
	} else if (totalAmount === 20000) {
		plan = 'Gold'
	} else if (totalAmount === 30000) {
		plan = 'Platinum'
	}

	// Adding data to bookings table
	async function isSameBookingExist(userID, carID) {
		const {data, error} = await supabase
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
		if (data.length > 0) {
			console.log('Same Booking Already Exist With Record:', data)
			// Fetch existing booking_id
			const bookingID = data[0].booking_id
			// 409 Conflict Error
			res.json({
				message: 'Record Conflict! Same Booking Already Exist',
				record: data,
				booking_id: bookingID,
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
						plan: plan,
						amount: 10000 * userData.tickets,
					},
				])
				.select()

			if (error) {
				console.log('Error inserting Booking Data:', error)
			} else {
				console.log('New Booking Data Saved Successfully: ', data)
				// Fetch New Booking ID
				const bookingID = data[0].booking_id
				res.status(201).json({
					message: "No Record Confliction, Voila! New Data Added",
					record: data,
					booking_id: bookingID
				})
			}
		}
	}

	isSameBookingExist(userID, carID)
}

module.exports = saveBookingData
