// Get today's date
const today = new Date();
const maxDate = new Date().fp_incr(60);

flatpickr('#flatpickr-calender', {
	// dateFormat: 'd-m-y',
	inline: true,
	mode: 'range',
	minDate: today,
	maxDate: maxDate,
	disable: []		// Takes date[] as value
})

const value = document.querySelector('#flatpickr-calender').value;
console.log("value is", value);

// document.querySelector('em').innerHTML = `The selected booking dates are from ${value}`;