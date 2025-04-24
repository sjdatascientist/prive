// Get today's date
const today = new Date()
const maxDate = new Date().fp_incr(60)

flatpickr('#flatpickr-calender', {
	// dateFormat: 'd-m-y',
	inline: true,
	mode: 'range',
	minDate: today,
	maxDate: maxDate,
	disable: [''], // Takes date[] as value
})

const calenderInput = document.querySelector('#flatpickr-calender')
calenderInput.addEventListener('change', (event) => {
	bookingDates = event.target.value

	function shortDate(date) {
		const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
		return date.toLocaleDateString('en-IN', options).replace(/\//g, '-')
	}

	function getDateArray(start, end) {
		let arr = []
		let dt = new Date(start)
		while (dt <= end) {
			arr.push(new Date(dt))
			dt.setDate(dt.getDate() + 1)
		}
		return arr
	}

	function getWeekendDates(startDate, endDate) {
		const allDates = getDateArray(startDate, endDate)
		return allDates.filter((date) => {
			const day = date.getDay()
			return day === 0 || day === 6 // 0 = Sunday, 6 = Saturday
		})
	}

	function calculateWeightedDays(startDate, endDate) {
		let totalValue = 0
		let currentDate = new Date(startDate)

		while (currentDate <= endDate) {
			const day = currentDate.getDay()
			// Weekend: Saturday (6) or Sunday (0)
			if (day === 0 || day === 6) {
				totalValue += 2
			} else {
				// Weekday: Monday to Friday
				totalValue += 1
			}
			currentDate.setDate(currentDate.getDate() + 1)
		}
		return totalValue
	}

	if (bookingDates.length == 24) {
		// format 24-05-2025
		const selectedStartDate_string = bookingDates.slice(0, 10)
		const selectedStartEnd_string = bookingDates.slice(14, 25)
		// format Thu Apr 24 2025 05:30:00 GMT+0530 (India Standard Time)
		const selectedStartDate_long = new Date(selectedStartDate_string)
		const selectedEndDate_long = new Date(selectedStartEnd_string)
		// Generating date array from date range
		const allDates = getDateArray(selectedStartDate_long, selectedEndDate_long)
		const weekendDates = getWeekendDates(selectedStartDate_long, selectedEndDate_long)
		const totalWeightedBookingDays = calculateWeightedDays(selectedStartDate_long, selectedEndDate_long)

		if (totalWeightedBookingDays <= 10) {
			document.querySelector('em').innerHTML = `The selected booking dates are from ${shortDate(selectedStartDate_long)} to ${shortDate(
				selectedEndDate_long
			)} (i.e. ${totalWeightedBookingDays} Days)`
			document.querySelector('em').style.color = 'green'
			document.getElementById('reserve-btn').disabled = false
		} else {
			document.querySelector(
				'em'
			).innerHTML = `You have exceeded the maximum number of booking dates (i.e. ${totalWeightedBookingDays} Days)<br>
			Read Note for more info!`
			document.querySelector('em').style.color = 'red'
		}
	}
})
