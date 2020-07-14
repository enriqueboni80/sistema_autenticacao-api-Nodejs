const request = require('supertest')

const app = require('../app')
const serviceUser = require('../service/Users')

test('Enviar email com token para recuperação de senha', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': 'enriqueboni80@gmail.com', 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/forgot-password')
        .send({ 'email': user.email })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});

test('Resetando a senha do usuario - através do forgot Password', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': 'enriqueboni80@gmail.com', 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/forgot-password/reset')
        .send({ 'id': user.id, 'activationtoken': user.activation_token, 'password': 'LivroAberto.' })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});