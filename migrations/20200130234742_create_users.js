
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').unsigned().primary()
        table.string('username').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.string('activation_token').nullable()
        table.boolean('validated').defaultTo(false).notNull()
        table.boolean('active').defaultTo(true).notNull()
        table.timestamps(false, false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
