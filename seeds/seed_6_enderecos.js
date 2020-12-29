
var endereco1 = {
  "evento_id": 1,
  "rua": "Rua das Couves Atualizado",
  "numero": "500",
  "complemento": "301",
  "bairro": "Floresta",
  "cidade": "Belo Horizonte"
}

var endereco2 = {
  "evento_id": 2,
  "rua": "Rua das Couves Atualizado",
  "numero": "500",
  "complemento": "301",
  "bairro": "Floresta",
  "cidade": "Belo Horizonte"
}

var endereco3 = {
  "evento_id": 3,
  "rua": "Rua das Couves Atualizado",
  "numero": "500",
  "complemento": "301",
  "bairro": "Floresta",
  "cidade": "Belo Horizonte"
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('enderecos').del()
    .then(function () {
      // Inserts seed entries
      return knex('enderecos').insert([endereco1, endereco2, endereco3]);
    });
};
