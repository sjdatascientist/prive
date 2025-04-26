const {supabase} = require('../config/supabase')

const getBookingID = async function(userID, carID, numMemberships) {
    const amount = 10000 * numMemberships
    // Fetching booking_id using 3 params
    const response = await supabase.from('bookings').select('booking_id').match({
        user_id: userID,
        car_id: carID,
        num_memberships: numMemberships,
        amount: amount
    })
    const booking_id = response.data[0].booking_id
    return booking_id
}

module.exports = getBookingID