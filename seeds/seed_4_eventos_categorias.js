
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eventos_categorias').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventos_categorias').insert([
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
