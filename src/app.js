require('dotenv').config();

const express = require('express');
const path = require('path');

//as rotas do diretorio Routers:
const rotas = require('./Routers/rotas');
const api = require('./Routers/api');

const app = express();

app.use(rotas);
app.use('/api', api);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.listen(process.env.PORT || 3000, ()=> console.log("Aplicacao rodando"));
