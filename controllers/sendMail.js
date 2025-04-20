require('dotenv').config()
const nodemailer = require("nodemailer");


const sendMail = async (req, res) => {
    const { name, email, phone, car, city } = req.formData;
    
    // Configure transporter (replace with your credentials)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        secure: true,
        auth: {
            user: 'prive.platform@gmail.com',     // Your Gmail
            pass: process.env.GOOGLE_APP_PASSWORD  // Generated App Password
        }
    });

    // Set Email Options
    const mailOptions = {
        from: "'Privé Drive' <prive.platform@gmail.com>",
        to: "response@dieselry.com",
        bcc: "prive.platform@gmail.com" ,
        subject: 'User Contacted Us!',
        text: `New User Details From Contact Form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCar Model: ${car}\nCity: ${city}`
    };

    try {
        await transporter.sendMail(mailOptions);
        // res.send('Form submitted and email sent successfully');
        res.status(200).json({ message: 'Form submitted and email sent successfully' });
        // res.sendStatus(200)
    } catch (error) {
        // console.error('Email send error:', error);
        // res.status(500).json({error: 'Failed to send email. Please try again later.'});
        res.sendStatus(500)
    }
};


module.exports = sendMail;