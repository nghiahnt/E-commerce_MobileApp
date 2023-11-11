const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerificationEmail = async (email, verificationToken) => {
  // Create Nodemailer tranporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user: process.env.ACCOUNT_GOOGLE,
      pass: process.env.PASSWORD,
    },
  });

  // Compose the email address
  const info = {
    from: process.env.ACCOUNT_GOOGLE,
    to: email,
    subject: "Email verification",
    text: `Please click the following link to verify your email: http://localhost:8000/api/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(info)
  } catch (err) {
    console.log("Error sending verification email", err);
  }
};

module.exports = sendVerificationEmail;
