
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categorias_eventos').del()
    .then(function () {
      // Inserts seed entries
      return knex('categorias_eventos').insert([
        {id: 1, name: 'Eventos OnLine'},
        {id: 2, name: 'Festas e Shows'},
        {id: 3, name: 'Teatros e Espetáculos'},
        {id: 4, name: 'Cursos e WorkShops'},
        {id: 5, name: 'Congressos e Palestras'},
        {id: 6, name: 'Tecnologia'},
        {id: 7, name: 'Gastronomia'},
        {id: 8, name: 'Esportes'}
      ]);
    });
};
