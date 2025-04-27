// Get today's date
const today = new Date()
const maxDate = new Date().fp_incr(60)

flatpickr('#flatpickr-calender', {
	// dateFormat: 'd-m-y',
	inline: true,
	// mode: 'range',
	mode: 'multiple',
	minDate: today,
	maxDate: maxDate,
	disable: [''], // Takes date[] as value
})

// Initially hide Table Element
$('.selected-dates-div').hide()

const calenderInput = document.querySelector('#flatpickr-calender')

calenderInput.addEventListener('change', (event) => {
	// Remove left padding as soon as user enters input
	$('input').css('padding-left', '10px')

	// String user output
	bookingDates_str = event.target.value

	// Array of string with Unsorted Dates
	const bookingDatesArrayUnsorted_str = bookingDates_str.split(', ').map((date_str) => date_str.trim())

	function sortDates(dateArray) {
		return dateArray.sort((a, b) => new Date(a) - new Date(b))
	}

	// Array of string with Sorted Dates
	const bookingDatesArray_str = sortDates(bookingDatesArrayUnsorted_str)

	// Array of date type values (Long Dates)
	const bookingDates = bookingDatesArray_str.map((dateStr) => new Date(dateStr))

	function formatDate(dateString) {
		const date = new Date(dateString)
		const day = date.getDate()
		const year = date.getFullYear()

		// Array of month names
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const monthName = months[date.getMonth()]

		return `${day} ${monthName} ${year}`
	}

	function getDayName(dateString) {
		const date = new Date(dateString)
		// Array of full day names
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		return days[date.getDay()]
	}

	$('.dynamic-data').remove()
	if (bookingDatesArray_str) {
		// Show table Div now
		$('.selected-dates-div').show()
		bookingDatesArray_str.map((dateStr) => {
			let row = $("<tr class='dynamic-data'></tr>")
			row.append('<td>' + formatDate(dateStr) + '</td>')
			row.append('<td>' + getDayName(dateStr) + '</td>')
			$('table').append(row)
		})
	}

	function shortDate(date) {
		const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
		return date.toLocaleDateString('en-IN', options).replace(/\//g, '-')
	}

	function getWeekendDates(dateArray) {
		return dateArray.filter((dateStr) => {
			const date = new Date(dateStr)
			const day = date.getDay()
			return day === 0 || day === 6 // Sunday = 0, Saturday = 6
		})
	}

	const weekendDates = getWeekendDates(bookingDatesArray_str)

	function calculateWeightedDays(dateArray) {
		let totalValue = 0
		dateArray.forEach((dateStr) => {
			const date = new Date(dateStr)
			const day = date.getDay()

			if (day === 0 || day === 6) {
				// Weekend
				totalValue += 2
			} else {
				// Weekday
				totalValue += 1
			}
		})
		return totalValue
	}

	const totalWeightedBookingDays = calculateWeightedDays(bookingDatesArray_str)


	if (bookingDatesArray_str) {
		if (totalWeightedBookingDays <= 10) {
			document.querySelector('em').innerHTML = `Your total booking weighted dates are ${totalWeightedBookingDays} Days<br>
			You can proceed for booking!`
			document.querySelector('em').style.color = 'white'
			document.querySelector('em').style.backgroundColor = 'mediumseagreen'
			document.getElementById('reserve-btn').disabled = false
		} else {
			document.querySelector('em').innerHTML = `You have exceeded the maximum number of booking dates (i.e. ${totalWeightedBookingDays} Days)<br>
			Note: A single weekend day (i.e. Saturday & Sunday) is counted as 2 days!`
			document.querySelector('em').style.color = 'white'
			document.querySelector('em').style.backgroundColor = 'tomato'
			document.getElementById('reserve-btn').disabled = true
		}
	}
})
