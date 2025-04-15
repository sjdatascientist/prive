// First controller: Form data handler
const handleFormData = (req, res, next) => {
    const { name, email, phone, car, city} = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !car || !city) {
        return res.status(400).send('All fields are required');
    }

    res.locals.formData = {
        name,
        email,
        phone,
        car,
        city,
    };
    console.log(res.locals.formData);
    next();
};

module.exports = handleFormData;