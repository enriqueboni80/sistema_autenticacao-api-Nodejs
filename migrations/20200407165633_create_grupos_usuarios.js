
exports.up = function (knex) {
    return knex.schema.createTable('grupos_usuarios', table => {
        table.integer('grupo_id')
        table.integer('user_id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('grupos_usuarios')
};
