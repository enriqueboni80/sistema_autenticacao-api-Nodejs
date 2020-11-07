const request = require('supertest')
const app = require('../app')
const serviceEventos = require('./../service/Eventos')


test('Registrando um evento', async () => {
    return await request(app).post('/eventos/store')
        .send({
            "name": `Puc_teste`,
            "qtd_vagas": 20,
            "palestrante": "José da silva",
            "url_imagem": "http://www.terra.com.br/",
            "detalhes": "detalhes do evento",
            "descricao": "Evento de teste",
            "categoria": 2,
            "preco": 50.00,
            "ativo": true,
            "gratuito": false,
            "privado": false,
            "cancelado": false,
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00",
            "prazo_inscricao": "2019-12-01 00:00:00",
            "endereco": {
                "rua": "Rua das Couves",
                "numero": "500",
                "complemento": "301",
                "bairro": "Floresta",
                "cidade": "Belo Horizonte",
                "estado": "Minas Gerais",
                "cep": "30380-000",
                "pais": "Brasil"
            }
        })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});

test('Retornando todos os Eventos', async () => {
    await request(app).post('/eventos')
        .send({
            "name": `Puc_teste 2`,
            "qtd_vagas": 20,
            "palestrante": "José da silva",
            "url_imagem": "http://www.terra.com.br/",
            "detalhes": "detalhes do evento",
            "descricao": "Evento de teste",
            "preco": 50.00,
            "ativo": true,
            "gratuito": false,
            "privado": false,
            "cancelado": false,
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00"
        })
        .send({
            "name": `Puc_teste 3`,
            "qtd_vagas": 20,
            "palestrante": "José da silva",
            "url_imagem": "http://www.terra.com.br/",
            "detalhes": "detalhes do evento",
            "descricao": "Evento de teste",
            "preco": 50.00,
            "ativo": true,
            "gratuito": false,
            "privado": false,
            "cancelado": false,
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00",
            "prazo_inscricao": "2019-12-01 00:00:00",
            "endereco": {
                "rua": "Rua das Couves",
                "numero": "500",
                "complemento": "301",
                "bairro": "Floresta",
                "cidade": "Belo Horizonte",
                "estado": "Minas Gerais",
                "cep": "30380-000",
                "pais": "Brasil"
            }
        })

    return request(app).get('/eventos').then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
        expect(res.status).toBe(200)
    })
});

test('Atualizando Evento', async () => {

    let evento = {
        "name": `Puc_teste 2`,
        "qtd_vagas": 20,
        "palestrante": "José da silva",
        "url_imagem": "http://www.terra.com.br/",
        "detalhes": "detalhes do evento",
        "descricao": "Evento de teste",
        "preco": 50.00,
        "ativo": true,
        "gratuito": false,
        "privado": false,
        "cancelado": false,
        "data_inicio": "2020-01-01 00:00:00",
        "data_fim": "2020-01-01 00:00:00",
        "prazo_inscricao": "2019-12-01 00:00:00"
    }
    let eventoId = await serviceEventos.store(evento)

    return await request(app).put('/eventos/update')
        .send({
            "id": eventoId,
            "name": `Puc_teste 3 - Atualizado`,
            "qtd_vagas": 50,
            "palestrante": "José da silva - Atualizado",
            "url_imagem": "http://www.terra.com.br/",
            "detalhes": "detalhes do evento - Atualizado",
            "descricao": "Evento de teste - Atualizado",
            "categoria": 5,
            "preco": 50.00,
            "ativo": true,
            "gratuito": false,
            "privado": false,
            "cancelado": false,
            "data_inicio": "2020-01-01 00:00:00",
            "data_fim": "2020-01-01 00:00:00",
            "prazo_inscricao": "2019-12-01 00:00:00",
            "endereco": {
                "rua": "Rua das Couves - Atualizado",
                "numero": "500 - Atualizado",
                "complemento": "301 - Atualizado",
                "bairro": "Floresta - Atualizado",
                "cidade": "Belo Horizonte - Atualizado",
                "estado": "Minas Gerais - Atualizado",
                "cep": "30380-000 - Atualizado",
                "pais": "Brasil - Atualizado"
            }
        }).then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'ok')
        })
});