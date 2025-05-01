const {supabase} = require('../config/supabase')
const getCarID = require("../utils/getCarID")

const getBookingCalender = async (req, res) => {
    const {bookingID, email, phone, city, car} = req.body
    const carID = await getCarID(car)

    const groupData = await supabase.from('bookings').select('group').eq('booking_id', bookingID)
    const group = groupData.data[0].group

    const {data, error} = await supabase.from('bookings').select('booking_dates').match({
        car_id: carID,
        city: city,
        group: group
    })

    if (error) {
        console.log('Error Fetching Calender Booked Dates: ',error)
    }
    else {
        console.log("All Booked Dates Records: ", data)
        
    }
}

module.exports = getBookingCalender