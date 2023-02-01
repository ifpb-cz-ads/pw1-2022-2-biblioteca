require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const router = require('./router')
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkTK = require('./middlewares/middleware')




mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit("pronto");
}).catch(e =>{
    console.log(e);
});



//as rotas do diretorio Routers:
const rotas = require('./router');
const api = require('./Routers/api');
const { checkToken } = require('./middlewares/middleware');

app.use(express.json())

//app.use(checkToken())

app.use(rotas);
app.use('/api', api);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.listen(process.env.PORT || 3000, ()=> console.log("Aplicacao rodando http://localhost:3000"));
