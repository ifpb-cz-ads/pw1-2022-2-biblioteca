const express = require('express');
const router = express.Router();
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/userController');
const Usuario = require('./models/Usuario');




router.get('/', (req, res)=>{
  res.redirect('/api/index')
})

router.get('/api/index', (req, res)=>{
  res.render('index')
})

router.get('/api/book-page', (req, res)=>{
  res.render('book-page')
})

router.post('/api/criarLivro',livroController.criarLivro);

router.post('/api/cadastro',usuarioController.cadastrarUsuario);


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

router.get('/api/logout', usuarioController.logoutUsuario)


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

//http://localhost:3000/micachan/melinda/sarauiva/1999-10-2
//http://localhost:3000/user/12212121/pesado/9999999/@chinesl/roraima