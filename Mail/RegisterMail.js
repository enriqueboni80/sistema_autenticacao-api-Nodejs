var nodemailer = require('nodemailer');
var sendEmail = require('./app/sendMail')
require('dotenv').config()

module.exports = (user) => {

    var mailOptions = {
        from: process.env.MAIL_FROM_NAME,
        to: user.email,
        subject: 'Email de Cadastro',
        text: 'Bem Vindo ao Sistema',
        template: 'register-mail',
        context: {
            username: user.nome,
            tokenAtivacao: `Id: ${user.id} token: ${user.activation_token}`
        }
    };
    sendEmail(mailOptions)
}