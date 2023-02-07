require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router')
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { middlewareGlobal } = require('./middlewares/middleware');
const path = require('path');
// const {contador} = require('./controllers/contador');



mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit("pronto");
}).catch(e =>{
    console.log(e);
});



//Sessions 
const sessionOptions = session({
    secret: `adhjh12jk3h123812738dhajshdjkashdh`,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      }
});

//contador diario
// contador.start();

app.use(sessionOptions);
app.use(middlewareGlobal);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(router);


app.on("pronto",()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Acessar http://localhost:3000")
        console.log(`Servidor execultando na porta 3000`);
    });
})
