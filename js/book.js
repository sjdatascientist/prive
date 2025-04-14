// const {carsListArray} = require('../data/cars_list');
import carsListArray from './data/cars_list.js'
console.log(carsListArray)

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
	const $location = $('#location')
    const $car = $('#car')
    const $tickets = $('#tickets')
    const $fuel = $('#fuel')
	const $submitBtn = $('#submitBtn')

    
	function validateForm() {
		const nameValid = $name.val().trim().length >= 2
		const emailValid = emailRegex.test($email.val().trim())
		const phoneValid = phoneRegex.test($phone.val().trim())
		const locationValid = $location.val().trim().length >= 3
        // const 

		// Update button state
		$submitBtn.prop('disabled', !(nameValid && phoneValid && emailValid && locationValid &&
			$car.val() && $tickets.val() && $fuel.val()))
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

	// Location validation
	$location.on('input', function () {
		const isValid = $(this).val().trim().length >= 3
		toggleValidationState($(this), $('#locationError'), isValid)
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

	// const $profileCardsContainer = $('#profileCardsContainer')

})
