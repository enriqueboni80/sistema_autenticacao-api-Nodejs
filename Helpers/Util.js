var bcrypt = require('bcryptjs');

module.exports = {
    getNow() {
        return new Date(Date.now())
    },
    gerarHash(password) {
        var hash = bcrypt.hashSync(password, 8);
        return hash
    },
    gerarToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    },
    compararPasswordsBycrypt(passwordDigitado, passwordDoBanco) {
        return bcrypt.compareSync(passwordDigitado, passwordDoBanco)
    }
}