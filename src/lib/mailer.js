const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (email, subject, text) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            cc: `${process.env.EMAIL}, ${process.env.EMAIL2}`,
            subject: subject,
            text: text,
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = sendEmail;
