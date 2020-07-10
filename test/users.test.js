const request = require('supertest')

const app = require('../app')

test('testando a primeira rota de usuarios', () => {
    return request(app).get('/users').then((res) => {
        expect(res.status).toBe(200)
    })
});