const swaggerUi = require('swagger-ui-express');
/* const swaggerJsdoc = require('swagger-jsdoc'); */


/* Desabilitei a criação automatica por enquanto 
const fileSwaggerAuto = require('./swagger-output.json') */

const fileSwaggerManual = require('./swagger-manual.json') 

/* const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: 'Sistema de Autenticação',
            version: '1.0.0',
            description: 'Sistema de autenticação em NodeJs',
        },
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./routes/Auth/*.js'],
}; 

const specs = swaggerJsdoc(options);*/

module.exports = (app) => {
    /* app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); */
    /* Desabilitei o uso do arquivo automatico por enquanto
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(fileSwaggerAuto)); */
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(fileSwaggerManual));
}
