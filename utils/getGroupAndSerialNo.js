const {supabase} = require('../config/supabase')

const getGroupAndSerialNo = async function(carID, city) {
    // Returns two vars, one is user group number, second is user shareholder serial number
    const {data, error} = await supabase.from('bookings').select('*').match({
        car_id: carID,
        city: city,
    }).select()

    if (error) {
        console.log(error)
        return
    }
    else {
        console.log('Matching records for all shareholders with same car and city: ',data)
        // existing shareholders for a car in a city
        const numShareholders = data.length
        // max number of car shareholders in a group
        const maxShareholders = 12
        // user shareholder serial number
        const userShareholderSerialNo = (numShareholders % maxShareholders) + 1
        // based on existing shareholders in which group user falls
        const userGroupNo = Math.floor(numShareholders / maxShareholders) + 1

        return {userGroupNo, userShareholderSerialNo}
    }
}

module.exports = getGroupAndSerialNo