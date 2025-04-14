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
	'Mercedes GLA 200',
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
	// const nameRegex = /^[a-zA-Z][a-zA-Z\s]{2,}$/
	const nameRegex = /^(?:[a-zA-Z]{3,}|[a-zA-Z][a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*[a-zA-Z])$/
	// const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const phoneRegex = /^[1-9]\d{9}$/

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
		// const nameValid = $name.val().trim().length >= 3
		const nameValid = nameRegex.test($name.val().trim())
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
		const isValid = nameRegex.test($name.val().trim())
		toggleValidationState($(this), $('#nameError'), isValid)
		const titleCaseValue = $name.val().replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
		$name.val(titleCaseValue)
		validateForm()
	})

	// Email validation
	$email.on('input', function () {
		const isValid = emailRegex.test($(this).val().trim())
		toggleValidationState($(this), $('#emailError'), isValid)
		$email.val($email.val().toLowerCase())
		validateForm()
	})

	// Phone validation
	$phone.on('input', function () {
		const isValid = phoneRegex.test($(this).val().trim())
		toggleValidationState($(this), $('#phoneError'), isValid)
		$phone.val($phone.val().replace(/\D/g, ''))
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
