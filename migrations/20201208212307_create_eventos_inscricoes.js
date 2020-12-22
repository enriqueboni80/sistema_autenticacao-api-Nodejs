
exports.up = function (knex) {
    return knex.schema.createTable('eventos_inscricoes', table => {
        table.integer('evento_id').unsigned().index().references('id').inTable('eventos')
        table.integer('user_id').unsigned().index().references('id').inTable('users')
        table.boolean('esteve_presente').defaultTo(false).notNull()
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('eventos_inscricoes')
};
