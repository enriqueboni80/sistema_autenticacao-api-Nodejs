const bcrypt = require('bcryptjs');


module.exports = {
    getNow() {
        return new Date(Date.now())
    },
    gerarHash(password) {
        var hash = bcrypt.hashSync(password, 8);
        return hash
    },
    gerarActivationToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
}