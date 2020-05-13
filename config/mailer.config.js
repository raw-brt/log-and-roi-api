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
    from: `Log and ROI`,
    to: targetUser.email,
    subject: 'Welcome to Log and ROI!',
    html: `
      <h4>Welcome to Log and ROI</h4>
      <p>Please, click the link below to confirm your email and start using Log and ROI</>
      <a href='${APP_HOST}/users/${targetUser.validateToken}/validate'>Click here to confirm account</a>
    `
  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}