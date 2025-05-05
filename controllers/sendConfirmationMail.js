require('dotenv').config()
const nodemailer = require("nodemailer");


const sendConfirmationMail = async (req, res) => {
    const { name, email, phone, city, car, tickets, fuel } = req.body;

    let plan = ''
	const totalAmount = tickets * 10000
	if (totalAmount === 10000) {
		plan = 'Silver'
	} else if (totalAmount === 20000) {
		plan = 'Gold'
	} else if (totalAmount === 30000) {
		plan = 'Platinum'
	}
    
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
        subject: 'We Have Successfully Received Your Payment!',
        text: `Thankyou For Purchasing Our Membership\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nCar: ${car}\nNo. of Memberships: ${tickets}\nPlan: ${plan}\nFuel: ${fuel}`
    };

    try {
        await transporter.sendMail(mailOptions);
        // res.status(200).json({ message: 'Thankyou for sending your valueable message!' });
        console.log('Payment Confirmation Mail Sent!')
    } catch (error) {
        // res.sendStatus(500)
        console.log('Error Occured While Sending Payment Confirmation Email: ', error)
    }
};


module.exports = sendConfirmationMail;