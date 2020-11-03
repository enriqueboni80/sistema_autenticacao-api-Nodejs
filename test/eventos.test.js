const request = require('supertest')
const app = require('../app')


test('Registrando um evento', async () => {
    return await request(app).post('/eventos/store')
        .send({
            "name": `Puc_teste`,
            "qtd_vagas": 20,
            "palestrante": "José da silva",
            "gratuito": true,
            "ativo": true,
            "descricao": "Evento de teste",
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00"
        })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});

test('Retornando todos os Eventos', async () => {
    return await request(app).post('/eventos')
        .send({
            "name": `Puc_teste`,
            "qtd_vagas": 20,
            "palestrante": "José da silva",
            "gratuito": true,
            "ativo": true,
            "descricao": "Evento de teste",
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00"
        })
        .send({
            "name": `Puc_teste`,
            "qtd_vagas": 50,
            "palestrante": "Aryton Senna",
            "gratuito": true,
            "ativo": true,
            "descricao": "Evento de teste",
            "data_inicio": "2020-02-02 00:00:00",
            "data_fim": "2020-02-02 00:00:00"
        }).then(() => {
            return request(app).get('/eventos').then((res) => {
                expect(res.body.length).toBeGreaterThan(1)
                expect(res.status).toBe(200)
            })
        })
});

test('Atualizando Evento', async () => {

    let eventoId = await request(app).post('/eventos/store')
        .send({
            "name": `Puc_teste`,
            "qtd_vagas": 20,
            "palestrante": "José da silva",
            "gratuito": true,
            "ativo": true,
            "descricao": "Evento de teste",
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00"
        }).then((res) => {
            return res.body.eventoId;
        })

        return await request(app).put('/eventos/update')
        .send({
            "id": eventoId,
            "name": `Puc_teste Atualizado`,
            "qtd_vagas": 20,
            "palestrante": "José da silva - Atualizado",
            "gratuito": true,
            "ativo": true,
            "descricao": "Evento de teste",
            "data_inicio": "2020-01-21 00:00:00",
            "data_fim": "2020-01-21 00:00:00"
        }).then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'ok')
        })

});