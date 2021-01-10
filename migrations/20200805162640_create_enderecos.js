
exports.up = function(knex) {
    return knex.schema.createTable('enderecos', table => {
        table.integer('user_id').nullable()
        table.integer('evento_id').nullable()
        table.string('rua').nullable()
        table.string('numero').nullable()
        table.string('complemento').nullable()
        table.string('bairro').nullable()
        table.string('cidade').nullable()
        table.string('estado').nullable()
        table.string('cep').nullable()
        table.string('pais').nullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('enderecos')
};
