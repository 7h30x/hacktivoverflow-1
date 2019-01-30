const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
module.exports = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER_AUTH, // generated ethereal user
    pass: process.env.GMAIL_USER_PASS, // generated ethereal user
  }
});