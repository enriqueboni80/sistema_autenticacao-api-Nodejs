
const Util = require('../helpers/Util');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'Administrador',
          email: 'admin@admin.com',
          password: '$2a$08$cq6HrRGJ93mOCqj9Oe8gm.t/DspxxU3JZFC.Jnc45khx7Ntc99GRq',
          activation_token: 'wxvllu3pw9qbytastj0zp5',
          validated: 1,
          active: 1,
          created_at: Util.getNow()
        }
      ]);
    });
};
