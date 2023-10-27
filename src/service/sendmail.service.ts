const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pardo0alzate@gmail.com',
    pass: 'coxf zxjk psbk vdjl',
  },
});

export {transporter}