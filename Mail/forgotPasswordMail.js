var nodemailer = require('nodemailer');
var sendEmail = require('./app/sendMail')
require('dotenv').config()

module.exports = (user) => {

    var mailOptions = {
        from: process.env.MAIL_FROM_NAME,
        to: user.email,
        subject: 'Email de Recuperacao de senha',
        text: 'Email de Recuperacao de senha',
        template: 'forgotPassword-mail',
        context: {
            username: user.nome,
            link_ativacao: `${process.env.APP_URL}/forgot-password/${user.id}/forgot/${user.token}`
        }
    };
    sendEmail(mailOptions)
}