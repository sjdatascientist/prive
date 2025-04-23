const changeCase = require('change-case')

// First controller: Form data handler
const handleFormData = (req, res, next) => {
    const { name, email, phone, car, city} = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !car || !city) {
        return res.status(400).send('All fields are required');
    }

    // Instead of using res.locals.formData
    req.formData = {
        name: changeCase.capitalCase(name),
        email: email.toLowerCase(),
        phone: '+91' + phone,
        car,
        city,
    };
    next();
};

module.exports = handleFormData;