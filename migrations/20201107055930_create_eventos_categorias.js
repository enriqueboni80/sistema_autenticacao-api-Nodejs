exports.up = function(knex) {
    return knex.schema.createTable('eventos_categorias', table => {
        table.integer('id').unsigned().primary()
        table.string('name')
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('eventos_categorias')
};
