
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('grupos_usuarios').del()
    .then(function () {
      // Inserts seed entries
      return knex('grupos_usuarios').insert([
        {grupo_id: 2, user_id: 1}
      ]);
    });
};
