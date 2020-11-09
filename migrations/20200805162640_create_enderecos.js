
exports.up = function(knex) {
    return knex.schema.createTable('enderecos', table => {
        table.integer('user_id').nullable()
        table.integer('evento_id').nullable()
        table.string('rua').notNull()
        table.string('numero').notNull()
        table.string('complemento').nullable()
        table.string('bairro').notNull()
        table.string('cidade').notNull()
        table.string('estado').notNull()
        table.string('cep').notNull()
        table.string('pais').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('enderecos')
};
