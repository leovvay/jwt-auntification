const nodemailer = require("nodemailer");
const config = require('../config')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  }
});

let sendMail = (mailOptions)=>{
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
});
};

module.exports = sendMail;