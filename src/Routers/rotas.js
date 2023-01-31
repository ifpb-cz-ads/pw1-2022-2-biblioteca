const app = require('express').Router();

//aqui vai ser o detalhamento das entidades da aplicacao:
//unica rota que nao precisa login:
app.get('/', (req, res) => {
    res.render('index');
})


//aqui são as rotas que a gente decide quantas vai criar:

module.exports = app;
