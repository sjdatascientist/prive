document.getElementById('btn-to-bookdates').addEventListener('click', () => (window.location.href = '/bookdates'))

const paymentBtn = document.getElementById('paymentBtn')
const paymentDiv = document.getElementById('payment-complete-div')
const bookDatesBtn = document.getElementById('btn-to-bookdates')

paymentDiv.style.display = 'none'
bookDatesBtn.style.display = 'none'

// Initially hide details
$('.hidden-details').hide()

const userData = {
	name: $('#name').text(),
	email: $('#email').text(),
	phone: $('#phone').text(),
	city: $('#city').text(),
	car: $('#car').text(),
	fuel: $('#fuel').text(),
	tickets: Number($('#tickets').text()),
}

const {name, email, phone, city, car, tickets, fuel} = userData

// Saving user details on client side
sessionStorage.setItem("userData", JSON.stringify(userData))

// After consuming details delete hidden element
$('.hidden-details').delay(2000).remove()

$.ajax({
	url: "/saveBookingData",
	method: "POST",
	contentType: "application/json",
	data: JSON.stringify(userData),
	success: function (data) {
		const userBookingID = data.booking_id
		sessionStorage.setItem("userBookingID", JSON.stringify(userBookingID))

		// After this activate pay now button for further processing
		paymentBtn.addEventListener('click', async function () {
			// Step 1: Create order on your server
			$.ajax({
				// async: false,
				url: '/create-order',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					name,
					email,
					phone,
					city,
					car,
					tickets,
					fuel,
				}),
				dataType: 'json',
				success: function (data) {
					const order = JSON.parse(data)
		
					// Step 2: Open Razorpay checkout
					const options = {
						key: 'rzp_test_GG15JZpgJ2KB0r',
						amount: order.amount,
						currency: order.currency,
						name: 'Privé Drive',
						description: 'Test Payment',
						order_id: order.id,
						created_at: order.created_at,
						prefill: {
							name: '',
							email: order.notes.Email,
							contact: order.notes.Phone,
						},
						image: 'https://sowbpfqwcnvhxubqvzml.supabase.co/storage/v1/object/public/static-files.public//logo-with-bg.png',
						theme: {
							// color: "#ecff82",
							color: '#000',
						},
						modal: {
							ondismiss: function () {
								alert('Payment Cancelled')
							},
						},
						timeout: 600, // 10 Minutes
						readonly: {
							contact: true,
							email: true,
							name: false,
						},
						retry: {
							enabled: true,
							max_count: 4,
						},
		
						// Step 3: Verify Payment Signature
						handler: function (response) {
							$.ajax({
								url: '/verify-payment',
								method: 'POST',
								contentType: 'application/json',
								data: JSON.stringify({
									order_id: response.razorpay_order_id,
									payment_id: response.razorpay_payment_id,
									signature: response.razorpay_signature,
								}),
								dataType: 'json',
								success: function () {
									paymentDiv.style.display = 'block'
									window.location.href = '/payment#payment-complete-div'
									// Step 4: Update Payment Status to Completed in Database,
									// and assign group no. & shareholder serial number to user
									$.ajax({
										url: '/updateBookingData',
										method: "PATCH",
										contentType: 'application/json',
										data: JSON.stringify({
											userData,
											userBookingID
										})
										
									})
									setTimeout(function () {
										window.location.href = '/bookdates'
									}, 8000)
								},
								error: function () {
									alert('Payment Failed! Signature Verification Mismatched')
								},
							})
						},
					}
					// Create Razorpay Modal Window and Open Pop-Up
					const razorpayWindow = new Razorpay(options)
					razorpayWindow.open()
				},
			})
		})
	}
})


