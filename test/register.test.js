const request = require('supertest')

const app = require('../app')
const serviceUser = require('../service/Users')

test('testando registro de usuario', async () => {
    return await request(app).post('/register')
        .send({ 'username': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});

test('Ativando usuario através do activationToken', async () => {
    let user_id = await serviceUser.register({ 'username': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/validate')
        .send({ 'id': user.id, 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});

test('Ativando usuario através do activationToken : Faltando ID', async () => {
    let user_id = await serviceUser.register({ 'username': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/validate')
        .send({ 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Falta o ID do usuario')
        })
});

test('Ativando usuario através do activationToken : Faltando activationToken', async () => {
    let user_id = await serviceUser.register({ 'username': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/validate')
        .send({ 'id': user.id })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Falta o activation token')
        })
});

test('Não deve inserir usuário sem username', () => {
    return request(app).post('/register')
        .send({ 'username': '', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('username é um atributo obrigatório')
        })
})

test('Não deve inserir usuário sem email', () => {
    return request(app).post('/register')
        .send({ 'username': 'Jose da silva', 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Email é um atributo obrigatório')
        })
})

test('Não deve inserir usuário com email existente', async () => {
    let email = `enriqueboni80+${Date.now()}@gmail.com`
    let firstUser = { 'username': 'José ', 'email': email, 'password': 'abc123.' }
    let secondUser = { 'username': 'André', 'email': email, 'password': 'abc123.' }

    await request(app).post('/register').send(firstUser)

    return await request(app).post('/register')
        .send(secondUser)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Já existe um usuário com esse email')
        })
});