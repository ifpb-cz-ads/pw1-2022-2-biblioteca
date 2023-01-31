const { route } = require('../router');

const app = require('express').Router();
const loginController = require('./src/controllers/loginController.js')

//aqui vai ser o detalhamento das entidades da aplicacao:
//unica rota que nao precisa login:
app.get('/', (req, res) => {
    res.send('index');
})
//aqui são as rotas que a gente decide quantas vai criar:

module.exports = app;

route.get("/api/login/index", loginController.index)
