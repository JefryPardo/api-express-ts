const nodemailer = require('nodemailer');
const fs = require('fs');
const pdf = require('html-pdf');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'cotizacion.generada@gmail.com',
    pass: 'fwhz xzuy noqk mfjm',
  },
});

const generarpdf = async (html:string, callback:any) => {
  
  pdf.create(html).toBuffer((err:any, buffer:any) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    callback(null, buffer);
  });
};

export {transporter, generarpdf}