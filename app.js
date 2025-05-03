const express = require('express')
const path = require('path')
const compression = require('compression')
const cors = require('cors')
// const bodyParser = require('body-parser')

// Importing JS variables (utilities)
const cities = require("./utils/cities")
const cars = require('./utils/cars')

// Importing Configs
const startNgrok = require('./config/ngrok')

// Importing all controllers
const handleFormData = require('./controllers/handleContactUsForm')
const sendMail = require('./controllers/sendMail')
const saveUserData = require('./controllers/saveUserData')
const updateBookingData = require("./controllers/updateBookingData")
const saveBookingData = require("./controllers/saveBookingData")
const createOrder = require('./controllers/createOrder')
const verifyPayment = require('./controllers/verifyPayment')
const setPaymentComplete = require("./controllers/setPaymentComplete")
const razorpayWebhook = require('./controllers/razorpayWebhook')
const getBookingCalender = require('./controllers/getBookingCalender')
const reserveBookingDates = require("./controllers/reserveBookingDates")

const app = express()

app.use(cors())

// Essentails middlewares for every request
app.use(compression())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Setting an App variable for global usage
app.locals.globalCars = cars

// Serve public folder
app.use('/assets', express.static(path.join(__dirname, 'public')))

// Serve Images from the assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// Serve CSS files
app.use('/css', express.static(path.join(__dirname, 'css')))

// Serve JavaScript files
app.use('/js', express.static(path.join(__dirname, 'js')))

// Set EJS as the templating engine
app.set('view engine', 'ejs')

// Set views folder
app.set('views', path.join(__dirname, 'views'))

// All Routes
app.get('/', (req, res) => {
	res.render('index', {cars, cities})
})

app.post('/contactform', handleFormData, sendMail)

app.get('/cars', (req, res) => {
	res.render('cars')
})

app.get('/memberships', (req, res) => {
	res.render('memberships')
})

app.get('/contact', (req, res) => {
	res.render('contact')
})

app.get('/book', (req, res) => {
	res.render('book', {cars, cities})
})

app.post('/payment', saveUserData, (req, res) => {
	const userData = req.userData
	res.render('payment', {userData})
})

app.post('/saveBookingData', saveBookingData)

app.post('/create-order', createOrder)

app.post('/verify-payment', verifyPayment)

// app.patch('/setPaymentComplete', setPaymentComplete)

app.post('/webhook', razorpayWebhook)

app.patch('/updateBookingData', updateBookingData)

app.get('/bookdates', (req, res) => {
	res.render('bookdates')
})

app.post('/getBookingCalender', getBookingCalender)

app.patch('/reserveBookingDates', reserveBookingDates)

// app.post('/updateBookingData',  updateBookingData)



app.get('/compare', (req, res) => {
	res.render('compare')
})

app.get('/privacy-policy', (req, res) => {
	res.render('privacy-policy')
})

app.get('/terms-and-conditions', (req, res) => {
	res.render('terms-conditions')
})

app.get('/getCars', (req, res) => {
	res.json(cars)
})

app.get('/pay', (req, res) => {
	res.render('pay')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
    // Open Tunnel and Create Public URL for our App
	// startNgrok()
})
