const {supabase} = require('../config/supabase')

const reserveBookingDates = async (req, res) => {
    const {booking_id, booking_dates} = req.body 

    const {data, error} = await supabase.from('bookings').update({
        booking_dates: booking_dates,
    }).eq('booking_id', booking_id).select()

    if (error) {
        console.log('Error Adding Booking Dates', error)
    }
    else {
        console.log("Booking Dates Slots Are Successfully Added", data)
    }
}

module.exports = reserveBookingDates