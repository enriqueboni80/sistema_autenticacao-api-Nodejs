const request = require('supertest')

const app = require('../app')

test.skip('testando a primeira rota', () => {
    return request(app).get('/').then((res) => {
        expect(res.status).toBe(200)
    })
});