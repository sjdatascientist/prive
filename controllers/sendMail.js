require('dotenv').config()
const nodemailer = require("nodemailer");

/* 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.GOOGLE_USERNAME,
      pass: process.env.GOOGLE_PASSWORD
    },
  });
 */

/* 
async function sendMail() {
    // taking out form data
    const { name, email, phone, car, city } = res.locals.formData;

    // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'prive.platform@gmail.com', // sender address
    to: 'prive.platform@gmail.com',// list of receivers
    subject: "User Details", // Subject line
    text: `Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Car: ${car}
            City: ${city}`, // plain text body
    // html: "<b>Hello User, this is test mail", // html body
  });

  console.log("Message sent: %s", info.messageId);
}
 */
// Second controller: Email sender
const sendMail = async (req, res) => {
    const { name, email, phone } = res.locals.formData;
    
    // Configure transporter (replace with your credentials)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'prive.platform@gmail.com',     // Your Gmail
            pass: process.env.GOOGLE_PASSWORD  // Generated App Password
        }
    });

    // Email content
    const mailOptions = {
        from: 'prive.platform@gmail.com',
        to: 'prive.platform@gmail.com',          // Same as sender
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Form submitted and email sent successfully');
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).send('Error sending email');
    }
};


module.exports = sendMail;