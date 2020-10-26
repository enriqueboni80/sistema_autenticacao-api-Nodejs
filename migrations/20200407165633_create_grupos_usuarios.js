
exports.up = function (knex) {
    return knex.schema.createTable('grupos_usuarios', table => {
        table.integer('grupo_id').unsigned().index().references('id').inTable('grupos')
        table.integer('user_id').unsigned().index().references('id').inTable('users')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('grupos_usuarios')
};
