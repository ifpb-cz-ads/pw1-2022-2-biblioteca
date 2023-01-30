require('dotenv').config();

const express = require('express');
const app = express();



//as rotas do diretorio Routers:
const rotas = require('./Routers/rotas');
const api = require('./Routers/api');

app.use(rotas);
app.use('/api', api);


app.listen(process.env.PORT || 3000, ()=> console.log("Aplicacao rodando"));