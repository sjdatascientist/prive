const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, '../data/cars.json');

const carsJSON = fs.readFileSync(filePath, "utf8");
const cars = JSON.parse(carsJSON);

module.exports = cars;