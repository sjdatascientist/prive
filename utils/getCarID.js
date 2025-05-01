const {supabase} = require('../config/supabase')

const getCarID = async function(car) {
    // Search for car_id from cars table by Car Name
	const response = await supabase.from('cars').select('car_id').eq('car_mmv', car);
	const car_id = response.data[0].car_id;
    return car_id;
}

module.exports = getCarID