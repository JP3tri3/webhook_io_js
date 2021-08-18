require('dotenv').config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.generateVerificationEmail = (verificationCode) => {
    const mailOptions = {
        from: process.env.FROM_EMAIL_ACCOUNT,
        to: process.env.TO_EMAIL_ACCOUNT,
        subject: `Verification Code`,
        text: `Verification Code: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};

