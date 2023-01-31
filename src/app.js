require('dotenv').config();

const express = require('express');
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
app.use(router);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.on("pronto",()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Acessar http://localhost:3000")
        console.log(`Servidor execultando na porta 3000`);
    });
})

