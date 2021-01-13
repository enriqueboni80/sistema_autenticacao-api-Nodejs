# sistema_autenticacao-api-Nodejs
Backend / API do sistema de eventos desenvolvido para Puc Minas. 

# versão homologada
* Node version: v12.6.0;
* npm version: 6.9.0;
* PostgreSQL: 13.0

## Configuracoes da aplicacao
##### Instalar as dependências
```
npm install
```
##### Copiar o arquivo .env_default, mudar o nome do arquivo copiado para .env e configurar as variáveis de ambiente
```
copy .env__default .env
```
##### Rodar a migrate para criar o banco
```
npm run knex migrate:latest
```
##### rodar seed para primeira inserção nas tabelas
```
npm run knex seed:run
```
##### rodar teste Jest
```
npm run secure-mode
```
##### USUARIO ADMIN (Painel Administrativo)
user: admin@admin.com
password: Admin123

##### USUARIO DE TESTE
user: usuario1@pucminas.br
password: Puc@123!

user: usuario2@pucminas.br
password: Puc@123!