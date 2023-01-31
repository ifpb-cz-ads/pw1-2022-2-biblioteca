const express = require('express');
const app = express();
const router = require('./router')

require('dotenv').config();
const { default: mongoose } = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit("pronto");
}).catch(e =>{
    console.log(e);
});

app.use(router);



app.on("pronto",()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Acessar http://localhost:3000")
        console.log(`Servidor execultando na porta 3000`);
    });
})

