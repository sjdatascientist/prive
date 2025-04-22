const saveUserData = (req, res, next) => {
    const {name, email, phone, city, car, tickets, fuel} = req.body;

    // Creating User Data Object
    const userData = {
        name,
        email,
        phone,
        city,
        car,
        tickets,
        fuel,
    }

    req.userData = userData;
    next()
}

module.exports = saveUserData