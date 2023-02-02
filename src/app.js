require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const router = require('./router')
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { middlewareGlobal, loginReq } = require('./middlewares/middleware');




mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit("pronto");
}).catch(e =>{
    console.log(e);
});



//Sessions 
const sessionOptions = session({
    secret: `testando123`,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      }
});

app.use(sessionOptions);

//as rotas do diretorio Routers:
const rotas = require('./router');
const api = require('./Routers/api');


//app.use(check)
app.use(middlewareGlobal);
app.use(loginReq);

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use(rotas);
app.use('/api', api);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.listen(process.env.PORT || 3000, ()=> console.log("Aplicacao rodando http://localhost:3000"));
