exports.up = function(knex) {
    return knex.schema.createTable('categorias_eventos', table => {
        table.integer('id').unsigned().primary()
        table.string('name')
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categorias_eventos')
};
