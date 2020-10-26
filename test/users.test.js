const request = require('supertest')
const app = require('../app')
const serviceUser = require('./../service/Users')
const { autenticar } = require('../controllers/Auth/LoginController')


criaUsuario = async () => {
    let result = await request(app).post('/auth/register').send({ 'username': 'ricao', 'email': `enriqueboni80+${Date.now()}@gmail.com`, 'password': 'Abc123.' })
    let user = await serviceUser.getByEmail(result.body.email)
    await serviceUser.validate(user.id)
    return user
}

autenticarUsuario = async (user) => {
    let resultAuth = await request(app).post('/auth/login').send({ 'email': user.email, 'password': 'Abc123.' })
    return resultAuth.body.user
}


test('Atualizando usuario : Sem Endereço', async () => {
    var user = await criaUsuario()
    var userAuth = await autenticarUsuario(user)
    return request(app).put('/users')
        .set('Authorization', `Bearer ${userAuth.jwtToken}`)
        .send({
            "username": "enrique_atualizado",
            "password": "Abc123.....!!!",
            "email": `enriqueboni80_atualizado+${Date.now()}@gmail.com`
        })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});

test('Atualizando usuario : Atualizando e Criando um Endereço', async () => {
    var user = await criaUsuario()
    var userAuth = await autenticarUsuario(user)
    return request(app).put('/users')
        .set('Authorization', `Bearer ${userAuth.jwtToken}`)
        .send({
            "username": "enrique_atualizado",
            "password": "Abc123.....!!!",
            "email": `enriqueboni80_atualizado+${Date.now()}@gmail.com`,
            "endereco": { "rua": "Rua das Couves" }
        })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});


test('Atualizando usuario : Atualizando Endereço', async () => {
    var user = await criaUsuario()
    var userAuth = await autenticarUsuario(user)
    await request(app).put('/users')
        .set('Authorization', `Bearer ${userAuth.jwtToken}`)
        .send({
            "username": "enrique_atualizado",
            "password": "Abc123.....!!!",
            "email": `enriqueboni80_atualizado+${Date.now()}@gmail.com`,
            "endereco": { "rua": "Rua das Couves" }
        })

    return request(app).put('/users')
        .set('Authorization', `Bearer ${userAuth.jwtToken}`)
        .send({
            "username": "enrique_atualizado",
            "password": "Abc123.....!!!",
            "email": `enriqueboni80_atualizado+${Date.now()}@gmail.com`,
            "endereco": { "rua": "Rua das Couves_2" }
        })
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('success', true)
        })
});