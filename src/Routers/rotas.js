const app = require('express').Router();

//aqui vai ser o detalhamento das entidades da aplicacao:
//unica rota que nao precisa login:
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/book', (req, res) => {
	res.render('book-page');
})

app.get('/login', (req, res) => {
	res.render('login');
})

app.get('/signin', (req, res) => {
	res.render('signIn');
})
//aqui são as rotas que a gente decide quantas vai criar:

module.exports = app;
