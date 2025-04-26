// import supabase from "../config/supabase";
const {supabase} = require('../config/supabase')
const {v4: uuidv4} = require('uuid')
const cars = require('../vars/cars')
// Extracting Cars Name Only
const carsArray = Object.keys(cars)

async function insertCars() {
	const {data, error} = await supabase.from('cars').insert(
		carsArray.map((car) => ({
			car_id: uuidv4(),
			car_mmv: car,
			total_price: cars[car].totalPrice,
			cost_per_day: cars[car].costPerDay,
			rent_per_day: cars[car].rentPerDay,
		}))
	)

	if (error) {
		console.error('Error inserting data:', error)
	} else {
		console.log(await supabase.from('cars').select('*'))
	}
}

// Single Time Function Use
// Note: Already called no need to call again
// insertCars()
