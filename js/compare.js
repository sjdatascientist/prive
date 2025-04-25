async function readCarsJSON() {
	const response = await fetch('/getCars')
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
