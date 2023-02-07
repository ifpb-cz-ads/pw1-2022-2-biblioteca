const express = require('express');
const router = express.Router();
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/userController');
const emprestimoController = require('./controllers/emprestimoController');
const Usuario = require('./models/Usuario');
const { application } = require('express');


router.get('/', (req, res)=>{
  res.redirect('/index')
})

router.get('/cadastrar-livro', livroController.bookForm);

router.get('/index', (req, res)=>{
  res.render('index')
})

router.get('/api/book-page', (req, res)=>{
  res.render('book-page')
})

router.post('/api/criarLivro', loginReq, livroController.criarLivro);

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
  console.log('teste session email:', req.session)
  res.render('login')
})

router.post('/login/register', usuarioController.cadastrarUsuario)

router.post('/login/login', usuarioController.logarUsuario)

router.get('/api/logout', usuarioController.logoutUsuario);

//n use
router.delete('/api/delete', emprestimoController.deleteAllEmprestimos);


router.get('/user/:id', async(req, res)=>{
  const id = req.params.id

  //checkando usuários
  const user = await Usuario.findById(id, '-senha')
  console.log(user)
  if(!user){
    return res.status(404).json({msg: 'Usuário não encontrado'})
  }else{
    return res.status(200).json(user)
  }

})




module.exports = router;