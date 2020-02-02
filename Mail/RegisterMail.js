var nodemailer = require('nodemailer');
var sendEmail = require('./app/sendMail')
require('dotenv').config()

module.exports = () => {
        
    var mailOptions = {
            from: process.env.MAIL_FROM_NAME,
            to: 'enriqueboni80@hotmail.com',
            subject: 'Email de Cadastro',
            text: 'Bem Vindo ao Sistema'
        };

        sendEmail(mailOptions)
    
}