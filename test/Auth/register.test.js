const request = require('supertest')

const app = require('./../../app')
const serviceUser = require('./../../service/Users')

test('Registrando o usuario', async () => {
    return await request(app).post('/auth/register')
        .send({ 'username': 'Jose da silva', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});

test('Registrando o usuario : Não aceitar username menor que 4 caracteres', async () => {
    return await request(app).post('/auth/register')
        .send({ 'username': 'Jos', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('username não pode ser menor que 4 e nem maior que 50')
        })
});

test('Registrando o usuario : Não aceitar username maior que 50 caracteres', async () => {
    return await request(app).post('/auth/register')
        .send({ 'username': 'Joseadasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfaf', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('username não pode ser menor que 4 e nem maior que 50')
        })
});

test('Registrando o usuario : Não aceitar mail inválido', async () => {
    return await request(app).post('/auth/register')
        .send({ 'username': 'Jose', 'email': `enriqueboni80+${Date.now()}@gmail`, 'password': 'Abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Email não corresponde ao regex')
        })
});

test('Registrando o usuario : Não aceitar password fora da regra', async () => {
    return await request(app).post('/auth/register')
        .send({ 'username': 'Jose', 'email': `enriqueboni80+${Date.now()}@gmail.com.br`, 'password': 'abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Password não corresponde ao regex')
        })
});

test('Ativando usuario através do activationToken', async () => {
    var result = await request(app).post('/auth/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    return request(app).post('/auth/register/validate')
        .send({ 'id': user.id, 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});

test('Ativando usuario através do activationToken : Faltando ID', async () => {
    var result = await request(app).post('/auth/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    return request(app).post('/auth/register/validate')
        .send({ 'activationtoken': user.activation_token })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Falta o ID do usuario')
        })
});

test('Ativando usuario através do activationToken : Faltando activationToken', async () => {
    var result = await request(app).post('/auth/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    return request(app).post('/auth/register/validate')
        .send({ 'id': user.id })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Falta o activation token')
        })
});

test('Não deve inserir usuário sem username', () => {
    return request(app).post('/auth/register')
        .send({ 'username': '', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('username é um atributo obrigatório')
        })
})

test('Não deve inserir usuário sem email', () => {
    return request(app).post('/auth/register')
        .send({ 'username': 'Jose da silva', 'password': 'Abc123.' })
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Email é um atributo obrigatório')
        })
})

test('Não deve inserir usuário com email existente', async () => {
    let email = `enriqueboni80+${Date.now()}@gmail.com`
    let firstUser = { 'username': 'José ', 'email': email, 'password': 'Abc123.' }
    let secondUser = { 'username': 'André', 'email': email, 'password': 'Abc123.' }

    await request(app).post('/auth/register').send(firstUser)

    return await request(app).post('/auth/register')
        .send(secondUser)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Já existe um usuário com esse email')
        })
});