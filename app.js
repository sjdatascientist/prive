const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

// Middleware to parse form data
const handleFormData = require('./controllers/handleContactUsForm')
const sendMail = require('./controllers/sendMail')
const paymentController = require('./controllers/paymentController');
// import createOrder from "./controllers/paymentController"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "public")));

// Serve Images from the assets folder
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Serve CSS files
app.use("/css", express.static(path.join(__dirname, "css")));

// Serve JavaScript files
app.use("/js", express.static(path.join(__dirname, "js")));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Set views folder
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render('index')
})

// app.post('/contactform', handleContactUsForm, sendMail);
app.post('/contactform', handleFormData);

app.get('/cars', (req, res) => {
    res.render('cars')
})

app.get('/memberships/paymentform', (req, res) => {
    res.render('paymentform')
})

app.get('/memberships', (req, res) => {
    res.render('memberships')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/book', (req, res) => {
    res.render('book')
})

app.post('/book/payment', (req, res) => {
    const {name, email, phone, city, car, tickets, fuel} = req.body;
    res.render('payment', {name, email, phone, city, car, tickets, fuel})
})

app.get('/bookdates', (req, res) => {
    res.render('bookdates')
})

app.get('/privacy-policy', (req, res) => {
    filepath = path.join(__dirname, "public", "Prive Drive - Privacy Policy.pdf");
    try {
        res.download(filepath, "Prive Drive - Privacy Policy.pdf")
    }
    catch (e) {
        console.log('Error Downloading File:', err)
        res.status(500).end(err)
    }
})

app.post('/memberships/paymentform/createOrder', paymentController.createOrder)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
