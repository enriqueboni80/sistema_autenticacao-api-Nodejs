
exports.up = function(knex) {
    return knex.schema.createTable('eventos', table => {
        table.increments('id').unsigned().primary()
        table.string('name').notNull()
        table.integer('qtd_vagas').notNull()
        table.string('palestrante').notNull()
        table.string('url_imagem').nullable()
        table.string('detalhes').nullable()
        table.string('descricao').nullable()
        table.float('preco').nullable()
        table.boolean('ativo').defaultTo(false).notNull()
        table.boolean('gratuito').defaultTo(true).notNull()
        table.boolean('privado').defaultTo(false).notNull()
        table.boolean('cancelado').defaultTo(false).notNull()
        table.datetime('data_inicio').notNull()
        table.datetime('data_fim').notNull()
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('eventos')
};
