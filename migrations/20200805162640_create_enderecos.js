
exports.up = function(knex) {
    return knex.schema.createTable('enderecos', table => {
        table.integer('user_id')
        table.string('rua')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('enderecos')
};
