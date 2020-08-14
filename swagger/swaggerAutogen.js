//desabilitado

const swaggerAutogen = require('swagger-autogen')()
 
const doc = {
    info: {
        title: "My API",
        description: "Description"
    },
    host: "localhost:3000",
    schemes: ['http']
}
 
// o Plugin swaggerAutogen trata as rotas a partir da raiz e por isso os caminhos partem dela
const outputFile = './swagger/swagger-output.json'
const endpointsFiles = ['./routes/Auth/register.js']
 
swaggerAutogen(outputFile, endpointsFiles, doc)