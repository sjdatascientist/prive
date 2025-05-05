require('dotenv').config()
const nodemailer = require("nodemailer");


const reachOut = async (req, res) => {
    const { name, email, phone, city, message } = req.body;
    
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
        to: email.toLowerCase(),
        cc: "prive.platform@gmail.com",
        bcc: "response@dieselry.com",
        subject: 'Thankyou For Contacting!',
        text: `We Will Reach Out To You Soon\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Thankyou for sending your valueable message!' });
    } catch (error) {
        res.sendStatus(500)
    }
};


module.exports = reachOut;