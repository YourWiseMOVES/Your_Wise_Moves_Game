const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'yourwisemovesproject',
        pass: 'Sqt01rRa60' //updated to the actual gmail account for the project
    }
});

module.exports = transporter;
