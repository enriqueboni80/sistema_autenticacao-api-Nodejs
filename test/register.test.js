const request = require('supertest')

const app = require('../app')
const serviceUser = require('../service/Users')

test('testando registro de usuario', async () => {
    return await request(app).post('/register')
        .send({ 'nome': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});

test('Ativando usuario através do activationToken', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/active')
        .send({ 'id': user.id, 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});

test('Ativando usuario através do activationToken : Faltando ID', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/active')
        .send({ 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Falta o ID do usuario')
        })
});

test('Ativando usuario através do activationToken : Faltando activationToken', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return request(app).post('/register/active')
        .send({ 'id': user.id })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Falta o activation token')
        })
});

test('Não deve inserir usuário sem nome', () => {
    return request(app).post('/register')
        .send({ 'nome': '', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Nome é um atributo obrigatório')
        })
})

test('Não deve inserir usuário sem email', () => {
    return request(app).post('/register')
        .send({ 'nome': 'Jose da silva', 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Email é um atributo obrigatório')
        })
})

test('Não deve inserir usuário com email existente', async () => {
    let user_id = await serviceUser.register({ 'nome': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'abc123.' })
    let user = await serviceUser.getByID(user_id)
    return await request(app).post('/register')
        .send(user)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Já existe um usuário com esse email')
        })
});