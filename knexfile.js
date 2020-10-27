require('dotenv').config()

module.exports = {

    /*     development: {
            client: 'mysql',
            version: '5.5',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            },
            useNullAsDefault: true
        }, */

    development: {
        client: 'sqlite3',
        connection: {
            filename: './sqlite-test.db'
        },
        useNullAsDefault: true,
        migrations: {
            tableName: "knex_migrations",
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    test: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        useNullAsDefault: true,
        migrations: {
            tableName: "knex_migrations",
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        ssl: {
            rejectUnauthorized: false
        }
    },

    staging: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};