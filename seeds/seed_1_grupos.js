
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('grupos').del()
    .then(function () {
      // Inserts seed entries
      return knex('grupos').insert([
        {id: 1, name: 'System Administrators'},
        {id: 2, name: 'Administrators'},
        {id: 3, name: 'Managers'},
        {id: 4, name: 'Administrative employees'},
        {id: 5, name: 'Finance employees'},
        {id: 6, name: 'Producers'},
        {id: 7, name: 'Clients'}
      ]);
    });
};
