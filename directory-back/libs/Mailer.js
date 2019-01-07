const nodemailer = require('nodemailer');
const config = require('@root/config');

const {
  service,
  user,
  password,
  fromDefault,
} = config.mail;

class Mailer {
  constructor () {
    this.service = service;
    this.user = user;
    this.pass = password;
    this.fromDefault = fromDefault;
  }

  makeEmailTransporter () {
    const { service, user, pass } = this;
    return nodemailer.createTransport({ service, auth: { user, pass }, tls: { rejectUnauthorized: false } });
  }

  sendEmail ({ to, sendFrom, subject, html }) {
    return new Promise((resolve, reject) => {
      try {
        let { fromDefault } = this;
        fromDefault = sendFrom || fromDefault;

        const transporter = this.makeEmailTransporter();
        const mailOptions = {
          from: fromDefault,
          to,
          subject,
          html,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return reject(err);
          }

          return resolve(info);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = Mailer;
