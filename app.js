const express = require("express");
const path = require("path");

const paymentController = require('./controllers/paymentController');
// import createOrder from "./controllers/paymentController"

const app = express();

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

app.get('/cars', (req, res) => {
    res.render('cars')
})

app.get('/memberships/paymentform', (req, res) => {
    res.render('paymentform')
})

app.get('/memberships', (req, res) => {
    res.render('memberships')
})

app.get('/book', (req, res) => {
    res.render('book')
})

app.get('/bookdates', (req, res) => {
    res.render('bookdates')
})


app.post('/memberships/paymentform/createOrder', paymentController.createOrder)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
