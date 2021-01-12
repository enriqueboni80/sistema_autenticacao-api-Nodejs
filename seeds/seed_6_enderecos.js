
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

var endereco4 = {
  "evento_id": 4,
  "rua": "Rua das Couves Atualizado",
  "numero": "500",
  "complemento": "301",
  "bairro": "Floresta",
  "cidade": "Belo Horizonte"
}

var endereco5 = {
  "evento_id": 5,
  "rua": "Avenida Dom José Gaspar",
  "numero": "500",
  "complemento": "auditorio 1",
  "bairro": "Coração Eucarístico",
  "cidade": "Belo Horizonte"
}

var endereco6 = {
  "evento_id": 6,
  "rua": "Avenida Dom José Gaspar",
  "numero": "500",
  "complemento": "auditorio 2",
  "bairro": "Coração Eucarístico",
  "cidade": "Belo Horizonte"
}

var endereco7 = {
  "evento_id": 7,
  "rua": "Avenida Dom José Gasparo",
  "numero": "500",
  "complemento": "auditorio 3",
  "bairro": "Coração Eucarístico",
  "cidade": "Belo Horizonte"
}

var endereco8 = {
  "evento_id": 8,
  "rua": "Avenida Dom José Gaspar",
  "numero": "500",
  "complemento": "auditorio 4",
  "bairro": "Coração Eucarístico",
  "cidade": "Belo Horizonte"
}


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('enderecos').del()
    .then(function () {
      // Inserts seed entries
      return knex('enderecos').insert([endereco1, endereco2, endereco3, endereco4, endereco5, endereco6, endereco7, endereco8]);
    });
};
