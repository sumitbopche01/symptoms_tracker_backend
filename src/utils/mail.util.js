const nodemailer = require('nodemailer');

// Create a transporter object with the Gmail SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: "",
        pass: ""
    }
});

// Set up the email options
const mailOptions = {
    from: "sumitbopche01@gmail.com",
    to: 'sumitbopche01@gmail.com',
    subject: 'Test Email from Nodemailer',
    text: 'Hello from Nodemailer!'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error.message);
        return;
    }
    console.log('Message sent:', info.messageId);
});


transporter.sendMail(mailOptions);