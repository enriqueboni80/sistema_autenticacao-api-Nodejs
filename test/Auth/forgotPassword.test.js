const request = require('supertest')

const app = require('./../../app')
const serviceUser = require('./../../service/Users')

test('Enviar email com token para recuperação de senha', async () => {
    var result = await request(app).post('/auth/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    return request(app).post('/auth/forgot-password')
        .send({ 'email': user.email})
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});

test('Enviar email com token para recuperação de senha : Faltando passar o email', async () => {    
    return request(app).post('/auth/forgot-password')
        .send({})
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Email é um atributo obrigatório')
        })
});

test('Resetando a senha do usuario - através do forgot Password', async () => {
    var result = await request(app).post('/auth/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    return request(app).post('/auth/forgot-password/reset')
        .send({ 'id': user.id, 'activationtoken': user.activation_token, 'password': 'LivroAberto.' })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});