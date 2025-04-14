// Get today's date
const today = new Date();
const maxDate = new Date().fp_incr(60);

flatpickr('#flatpickr-calender', {
	// dateFormat: 'd-m-y',
	inline: true,
	mode: 'range',
	minDate: today,
	maxDate: maxDate,
	disable: [""]		// Takes date[] as value
})

const calenderInput = document.querySelector('#flatpickr-calender');
calenderInput.addEventListener("change", (event) => {
	bookingDates = event.target.value
	
	if (bookingDates) {
		document.querySelector('em').innerHTML = `The selected booking dates are from ${bookingDates}`;
	}
})
// 
