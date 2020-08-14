
exports.up = function(knex) {
    return knex.schema.createTable('grupos', table => {
        table.integer('id').unsigned().primary()
        table.string('name')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('grupos')
};
