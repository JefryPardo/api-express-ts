const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'cotizacion.generada@gmail.com',
    pass: 'fwhz xzuy noqk mfjm',
  },
});

export {transporter}