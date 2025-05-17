async function readCarsJSON() {
	const response = await fetch("https://api.jsonstorage.net/v1/json/8cab9a76-7081-4dc2-b37d-1cea97a946bb/d97055a0-129d-4ebf-814b-615d459939e6");
	const cars = await response.json()
	return cars
}

readCarsJSON().then((data) => {
	const carsObj = data
	const carsList = Object.keys(carsObj)

	const carsSelectElement = document.getElementById('car')

	carsList.forEach((car) => {
		const option = document.createElement('option')
		option.value = car
		option.textContent = car
		carsSelectElement.appendChild(option)
	})

	// $('.display-results').css('display', none)
	$('.display-results').hide()

	$('#car').on('change', (e) => {
		value = $('#car').val()
		console.log(value)
		$('.display-results').show()
		$('.car-name').text(value)
		$('.total-price').text(carsObj[value].totalPrice)
		$('.cost-price').text(carsObj[value].costPerDay)
		$('.rent-price').text(carsObj[value].rentPerDay)
	})
})
