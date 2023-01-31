require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const router = require('./router')
const { default: mongoose } = require("mongoose");
const path = require('path');


mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit("pronto");
}).catch(e =>{
    console.log(e);
});


//as rotas do diretorio Routers:
const rotas = require('./Routers/rotas');
const api = require('./Routers/api');


app.use(rotas);
app.use('/api', api);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.listen(process.env.PORT || 3000, ()=> console.log("Aplicacao rodando"));
