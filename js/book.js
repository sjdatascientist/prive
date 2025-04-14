// const {carsListArray} = require('../data/cars_list');
// import carsListArray from './data/cars_list.js'
// console.log(carsListArray)

const carsListArray = [
	'MG Cyberstar',
	'Mahindra SUV 700 D',
	'Mahindra Thar D',
	'Jeep Meridian',
	'Toyota Fortuner',
	'Audi Q5',
	'Mercedes E-class',
	'Mercedes SUV GLC 300',
	'BMW i7',
	'Range Rover Defender',
	'Jeep Wrangler',
	'Range Rover Defender',
	'Jeep Wrangler',
	'Range Rover Velar Petrol',
	'Innova Crysta',
	'Toyota Vellfire',
	'Kia Carens',
	'Toyota Camry',
	'BMW X5',
	'MG Gloster',
	'Mercedes Cabriolet',
	'Mahindra Scorpio',
	'Hyundai Creta',
	'Kia Seltos',
	'Mercedes GLS',
	'Kia Carnival',
	'Innova Hycross',
	'Mahindra Thar Roxx',
	'BMW X1 Sport',
	'Jeep Compass',
	'Land Rover Range Rover',
	'Mahindra EV BE6',
	'Mahindra EV BE9',
	'BMW X3',
	'Lexus ES 350H',
	'Volvo S90',
	'Grand Vitara',
	'Mercedes CLA 200',
]

const carsSelectElement = document.getElementById('car')

carsListArray.forEach((car) => {
	const option = document.createElement('option')
	option.value = car
	option.textContent = car
	carsSelectElement.appendChild(option)
})

$(document).ready(function () {
	// Validation patterns
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const phoneRegex = /^\d{10}$/

	// Form elements
	const $name = $('#name')
	const $email = $('#email')
	const $phone = $('#phone')
	const $city = $('#city')
	const $car = $('#car')
	const $tickets = $('#tickets')
	const $fuel = $('#fuel')
	const $submitBtn = $('#submitBtn')
	const $requiredNote = $('#requiredNote')

	function validateForm() {
		const nameValid = $name.val().trim().length >= 2
		const emailValid = emailRegex.test($email.val().trim())
		const phoneValid = phoneRegex.test($phone.val().trim())

		// Update button state
		$submitBtn.prop('disabled', !(nameValid && phoneValid && emailValid && $city.val() && $car.val() && $tickets.val() && $fuel.val()))
		if (!$submitBtn.prop('disabled')) {
			$requiredNote.hide() // Hide element if button is enabled
		} else {
			$requiredNote.show() // Show element if button is disabled
		}
	}

	// Name validation
	$name.on('input', function () {
		const isValid = $(this).val().trim().length >= 2
		toggleValidationState($(this), $('#nameError'), isValid)
		validateForm()
	})

	// Email validation
	$email.on('input', function () {
		const isValid = emailRegex.test($(this).val().trim())
		toggleValidationState($(this), $('#emailError'), isValid)
		validateForm()
	})

	// Phone validation
	$phone.on('input', function () {
		const isValid = phoneRegex.test($(this).val().trim())
		toggleValidationState($(this), $('#phoneError'), isValid)
		validateForm()
	})

	// city validation
	$city.on('change', function () {
		const isValid = true
		validateForm()
	})

	$car.on('change', function () {
		const isValid = true
		validateForm()
	})

	$tickets.on('change', function () {
		const isValid = true
		validateForm()
	})

	$fuel.on('change', function () {
		const isValid = true
		validateForm()
	})

	function toggleValidationState(inputElement, errorElement, isValid) {
		if (inputElement.val().trim() === '') {
			inputElement.removeClass('is-invalid')
			errorElement.hide()
		} else {
			inputElement.toggleClass('is-invalid', !isValid)
			errorElement.toggle(!isValid)
		}
	}
})
