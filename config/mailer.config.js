const nodemailer = require('nodemailer');

const APP_HOST = process.env.APP_HOST || 'http://localhost:3000';

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

module.exports.sendValidateEmail = targetUser => {
  transporter.sendMail({
    from: `Auth-Example ${user}`,
    to: targetUser.email,
    subject: 'Welcome to Log and ROI',
    html: `
      <h1>Welcome to Log and ROI</h1>
      <a href='${APP_HOST}/users/${targetUser.validateToken}/validate'>Click here to confirm account</a>
    `
  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}