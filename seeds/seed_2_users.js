
const Util = require('../helpers/Util');

var admin = {
  username: 'Administrador',
  email: 'admin@admin.com',
  password: '$2a$08$cq6HrRGJ93mOCqj9Oe8gm.t/DspxxU3JZFC.Jnc45khx7Ntc99GRq',
  activation_token: 'wxvllu3pw9qbytastj0zp5',
  validated: 1,
  active: 1,
  created_at: Util.getNow()
}

var enrique = {
  username: 'Enrique Bonifacio',
  email: 'enriqueboni80@gmail.com',
  password: '$2a$08$t0O9IcZjgDpB9SE6IhoHOOoOUKKSZEnWxHU4HPC5Y4eLAryvLAOhq',
  activation_token: '0nb02sb2at0lcf4wq4p5khg',
  validated: 1,
  active: 1,
  created_at: Util.getNow()
}

var pucUsuario1 = {
  username: 'Pucminas - usuario 1',
  email: 'usuario1@pucminas.br',
  password: '$2a$08$05CoLs9y73wOo5sQwTmie.YVPr249TZJ.0M294qfoCua1zzzyKTCq',
  activation_token: 'ph6le9apbfqbnl3dxrk8t9',
  validated: 1,
  active: 1,
  created_at: Util.getNow()
}

var pucUsuario2 = {
  username: 'Pucminas - usuario 2',
  email: 'usuario2@pucminas.br',
  password: '$2a$08$05CoLs9y73wOo5sQwTmie.YVPr249TZJ.0M294qfoCua1zzzyKTCq',
  activation_token: 'ph6le9apbfqbnl3dxrk8t9',
  validated: 1,
  active: 1,
  created_at: Util.getNow()
}


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([admin, enrique, pucUsuario1, pucUsuario2]);
    });
};
