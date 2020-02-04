var forgotPasswordMail = require('../mail/forgotPasswordMail')

module.exports = (user) => {
    forgotPasswordMail(user)
}