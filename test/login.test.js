const request = require('supertest')

const app = require('../app')
const serviceUser = require('../service/Users')

test('Autenticando o usuario', async () => {
    var result = await request(app).post('/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    await serviceUser.validate(user.id)
    return request(app).post('/login')
        .send({ 'email': user.email, 'password': 'Abc123.'})
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});