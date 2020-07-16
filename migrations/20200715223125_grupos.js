
exports.up = function(knex) {
    return knex.schema.createTable('grupos', table => {
        table.increments('id').unsigned().primary()
        table.integer('name')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('grupos')
};
