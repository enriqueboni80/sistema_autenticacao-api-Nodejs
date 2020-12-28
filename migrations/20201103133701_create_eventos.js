
exports.up = function(knex) {
    return knex.schema.createTable('eventos', table => {
        table.increments('id').unsigned().primary()
        table.string('name').notNull()
        table.integer('qtd_vagas').notNull()
        table.string('palestrante').notNull()
        table.string('url_imagem').nullable()
        table.string('detalhes').nullable()
        table.string('descricao', 20000).nullable()
        table.integer('categoria').default(null)
        table.float('preco').nullable()
        table.boolean('publicado').defaultTo(false).notNull()
        table.boolean('gratuito').defaultTo(true).notNull()
        table.boolean('privado').defaultTo(false).notNull()
        table.boolean('cancelado').defaultTo(false).notNull()
        table.timestamp('data_inicio',{ useTz: true }).notNull()
        table.timestamp('data_fim',{ useTz: true }).notNull()
        table.timestamp('prazo_inscricao',{ useTz: true }).nullable()
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('eventos')
};
