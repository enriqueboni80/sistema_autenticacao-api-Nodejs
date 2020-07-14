const request = require('supertest')

const app = require('../app')
const serviceUser = require('../service/Users')

test('testando registro de usuario', () => {
    return request(app).post('/register')
        .send({ 'nome': 'Jose da silva', 'email': 'enriqueboni80@gmail.com', 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});

test('Ativando o token do usuario', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': 'enriqueboni80@gmail.com', 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/active')
        .send({ 'id': user.id, 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});