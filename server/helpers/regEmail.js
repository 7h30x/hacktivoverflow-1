"use strict";


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  

  transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


module.exports = main;