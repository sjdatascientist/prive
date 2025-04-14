// import supabase from "../config/supabase";
const {supabase} = require("../config/supabase");
const { v4: uuidv4 } = require('uuid');
const {carsListArray}  = require("../data/cars_list");

async function insertCars() {
    const { data, error } = await supabase
        .from('cars')
        .insert(
            carsListArray.map(car => ({
                car_id: uuidv4(),
                car_mmv: car,
            }))
        );
        
    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Inserted data:', data);
    }
}

// Call the function
insertCars();
