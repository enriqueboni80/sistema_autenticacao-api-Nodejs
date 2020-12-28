var evento1 = {
  "name": `Como fazer amigos e influenciar pessoas`,
  "qtd_vagas": 100,
  "palestrante": "Dale Carnegie",
  "url_imagem": "https://www.selecoes.com.br/wp-content/uploads/2019/05/happy-women-hugging-each-other-picture-id929930552-760x450.jpg",
  "detalhes": "Evento voltado para o publico da Pucminas",
  "descricao": "",
  "categoria": 5,
  "preco": 50.00,
  "publicado": true,
  "gratuito": false,
  "privado": false,
  "cancelado": false,
  "data_inicio": "2021-01-11 08:00:00",
  "data_fim": "2021-01-15 20:00:00",
  "prazo_inscricao": "2021-01-01 20:00:00"
}

var evento2 = {
  "name": `Vencendo os limites`,
  "qtd_vagas": 200,
  "palestrante": "Ayrton Senna",
  "url_imagem": "https://s.ebiografia.com/img/se/nn/senna_tricampea_o_655_x_425.jpg",
  "detalhes": "Evento para esportistas",
  "descricao": "",
  "categoria": 5,
  "preco": 50.00,
  "publicado": true,
  "gratuito": false,
  "privado": false,
  "cancelado": false,
  "data_inicio": "2021-06-12 08:00:00",
  "data_fim": "2021-06-12 16:00:00",
  "prazo_inscricao": "2021-06-10 00:00:00"
}

var evento3 = {
  "name": `Tecnologias Humanitárias`,
  "qtd_vagas": 200,
  "palestrante": "Professor Xavier",
  "url_imagem": "https://portal.pucminas.br/imagedb/pucinforma/PIM_ARQ_IMAGE_PEQUE20200305144105.jpg",
  "detalhes": "Evento acadêmico",
  "descricao": "",
  "categoria": 5,
  "preco": 50.00,
  "publicado": true,
  "gratuito": false,
  "privado": false,
  "cancelado": false,
  "data_inicio": "2021-03-10 08:00:00",
  "data_fim": "2021-03-12 20:00:00",
  "prazo_inscricao": "2021-03-01 10:00:00"
}


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('eventos').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventos').insert([evento1, evento2, evento3]);
    });
};
