const {supabase} = require('../config/supabase')
const getUserID = require("../utils/getUserID")
const getCarID = require("../utils/getCarID")
// const getBookingID = require("../utils/getBookingID")
const getGroupAndSerialNo = require("../utils/getGroupAndSerialNo")

const updateBookingData = async (req, res) => {
    const userData = req.body

    const userID = await getUserID(userData.email)
    const carID = await getCarID(userData.car)

    // const bookingID = await getBookingID(userID, carID, userData.city, userData.tickets)

    const {userGroupNo, userShareholderSerialNo} = await getGroupAndSerialNo(carID, userData.city)

    async function addMoreBookingDetails() {
        const {data, error} = await supabase.from('bookings').update({
            group: userGroupNo,
            shareholder_serial_no: userShareholderSerialNo,
        }).match({
            user_id: userID,
            car_id: carID,
            city: userData.city,
        }).select()

        if (error) {
            console.log("Error Adding New Booking Details: ", error)
        }
        else {
            console.log("New Booking Fields Successfully Added", data)
        }
    }

    addMoreBookingDetails()
}

module.exports = updateBookingData