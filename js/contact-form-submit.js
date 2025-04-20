$(document).ready(function () {
	// initially hide thanks element
	$('.thanks-4-contacting').hide()

	$('form').on('submit', function (event) {
		event.preventDefault() // Prevent the default form submission

		$('#submitBtn').text("Submitting..")

		// Get form data
		let formData = new FormData(event.target)

		// Convert form data to JSON
		formData = Object.fromEntries(formData.entries())

		console.log(formData) // Log the form data

		$.ajax({
			url: '/contactform',
			method: 'POST',
			data: JSON.stringify(formData),
			contentType: 'application/json',
			dataType: 'json',
			success: function (xhr, status, response) {
				console.log(`xhr: ${xhr}\n
                    Status: ${status}\n
                    Status Code: ${xhr.status}\n
                    Message: ${response.message}\n
                    xhrResponse: ${xhr.responseJSON}\n
                    Response: ${response}`)
				// Append success alert
				$('.thanks-4-contacting').show(500)
				$('.form-section').hide()
				$('.thanks-4-contacting').delay(30000).hide(500)
			},
			error: function (xhr, status, response) {
				console.log(`xhr: ${xhr}\n
                    Status: ${status}\n
                    Status Code: ${xhr.status}\n
                    Error: ${response.error}\n
                    Response: ${response}`)
				alert('500 Internal Server Error While Sending Email')
			},
		})
	})
})
