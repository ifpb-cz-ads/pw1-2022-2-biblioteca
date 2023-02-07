const express = require('express');
const router = express.Router();
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/userController');
const emprestimoController = require('./controllers/emprestimoController');
const {loginreq} = require('./middlewares/middleware');
const Usuario = require('./models/Usuario');


router.get('/', (req, res)=>{
  res.redirect('/api/index')
})

router.get('/cadastrar-livro', livroController.bookForm);

router.get('/index',livroController.index);

router.get('/api/book-page', (req, res)=>{
  res.render('book-page')
})

router.post('/api/criarLivro',livroController.criarLivro);

router.get('/api/buscarLivro',livroController.busca);

router.get('/api/buscaTexto',livroController.buscaTexto)

router.post('/api/gerarEmprestimo',emprestimoController.criarEmprestimo);

router.get('/api/todosEmprestimo',emprestimoController.todosEmprestimos);

router.get('/api/emprestimoUser',emprestimoController.emprestimoUser);



//AREA DE LOGIN ///////////

router.get('/api/criarRegistro', (req, res)=>{
  res.render('signIn')
})

router.get('/api/logar', (req, res)=>{
  console.log(res.locals.user,"tesstando middleware");
  res.render('login')
})

router.post('/login/register', usuarioController.cadastrarUsuario)

router.post('/login/login', usuarioController.logarUsuario)

router.get('/api/logout', usuarioController.logoutUsuario);

//n use
router.delete('/api/delete', emprestimoController.deleteAllEmprestimos);
router.delete('/api/deleteBook',livroController.deleteAllLivros);
router.delete('/api/deleteUser',usuarioController.deleteAllUser);


router.get('/user/:id', async(req, res)=>{
  const id = req.params.id

  //checkando usuários
  const user = await Usuario.findById(id, '-senha')

  if(!user){
    return res.status(404).json({msg: 'Usuário não encontrado'})
  }else{
    return res.status(200).json(user)
  }

})




module.exports = router;