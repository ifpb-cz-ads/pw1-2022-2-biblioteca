const express = require('express');
const router = express.Router();
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/userController');
const emprestimoController = require('./controllers/emprestimoController');
const {loginReq} = require('./middlewares/middleware');
const Usuario = require('./models/Usuario');
const { application } = require('express');
const {upload} = require('./config/parser');

// Frontend
router.get('/', (req, res)=>{
  res.redirect('/index')
})

router.get('/index', livroController.index);

router.get('/index/busca', livroController.buscaTextual);

router.get('/cadastrar-livro', livroController.bookForm);

router.get('/livros', livroController.livrosEmprestados);

// Backend
router.post('/api/criarLivro', upload.single('image'),livroController.criarLivro);

router.get('/api/buscarLivro', livroController.busca);

router.get('/api/buscaTexto', livroController.buscaTexto)

router.post('/api/gerarEmprestimo', loginReq, emprestimoController.criarEmprestimo);

router.get('/api/todosEmprestimo', emprestimoController.todosEmprestimos);

router.get('/api/emprestimoUser', emprestimoController.emprestimoUser);



//AREA DE LOGIN ///////////

router.get('/api/criarRegistro', (req, res)=>{
  res.render('signIn')
})

router.get('/api/logar', (req, res)=>{
  res.render('login')
})

router.get('/api/book-page', (req, res)=>{
  res.render('book-page')
})

router.post('/login/register', usuarioController.cadastrarUsuario)

router.post('/login/login', usuarioController.logarUsuario)

router.get('/api/logout', usuarioController.logoutUsuario);

//n use
router.delete('/api/deleteALLEmprestimo', emprestimoController.deleteAllEmprestimos);
router.delete('/api/deleteAllUser',usuarioController.deleteAllUser);

router.delete('/api/deleteBook',livroController.deleteLivro);
router.delete('/api/deleteEmprestimo',emprestimoController.deleteEmprestimo);

module.exports = router;
