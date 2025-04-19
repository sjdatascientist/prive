$(document).ready(function () {
	// initially hide thanks element
	$('.thanks-4-contacting').hide()

	$('form').on('submit', function (event) {
		event.preventDefault() // Prevent the default form submission

        // Get form data
        let formData = new FormData(event.target);

        // Convert form data to JSON
        formData = Object.fromEntries(formData.entries());

        console.log(formData); // Log the form data

		$.ajax({
			url: '/contactform',
			method: 'POST',
			data: JSON.stringify(formData),
			contentType: 'application/json',
			dataType: "json",
			success: function (xhr, status, response) {
                console.log(`xhr: ${xhr}\n
                    Status: ${status}\n
                    Status Code: ${xhr.status}\n
                    Message: ${response.message}\n
                    xhrResponse: ${xhr.responseJSON}\n
                    Response: ${response}`
                )
				// Append success alert
				$('.thanks-4-contacting').show()
				$('.form-section').hide()
				setTimeout(function () {
					$('.thanks-4-contacting').hide()
				}, 15000)
			},
			error: function (xhr, status, response) {
                console.log(`xhr: ${xhr}\n
                    Status: ${status}\n
                    Status Code: ${xhr.status}\n
                    Error: ${response.error}\n
                    Response: ${response}`
                )
			},
		})
	})
})
