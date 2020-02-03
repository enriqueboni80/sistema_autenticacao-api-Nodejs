var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars')
var path = require('path')
require('dotenv').config()

module.exports = (mailOptions) => {
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    transporter.use('compile', hbs({
        viewEngine: {
            partialsDir: path.resolve('./views/mail_templates/'),
            layoutsDir: path.resolve('./views/mail_templates/'),
            defaultLayout: `${mailOptions.template}.hbs`
        },
        viewPath: path.resolve('./views/mail_templates/'),
        extName: '.hbs'
    }))

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            console.log('Email enviado')
        }
    });
}