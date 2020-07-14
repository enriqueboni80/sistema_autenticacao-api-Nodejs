const request = require('supertest')

const app = require('../app')
const serviceUser = require('../service/Users')

test('Autenticando o usuario', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    await serviceUser.active(user.id)
    return request(app).post('/login')
        .send({ 'email': user.email, 'password': 'abc123.'})
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});