
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').unsigned().primary()
        table.string('nome').notNull()
        table.string('email').notNull()
        table.string('password').notNull()
        table.string('token').nullable()
        table.boolean('active').defaultTo(false)
        table.timestamps(false, false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
