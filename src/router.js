const express = require('express');
const router = express.Router();
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/userController');
const emprestimoController = require('./controllers/emprestimoController');
const Usuario = require('./models/Usuario');



router.get('/', (req, res)=>{
  res.send("Rota funcionando");
})

//ROTA PRIVATA PARA USUARIOS LOGADOS
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



router.post('/api/criarLivro',livroController.criarLivro);

router.post('/api/cadastro',usuarioController.cadastrarUsuario);

router.get('/api/livros',livroController.busca);

router.post('/api/realizarEmpresimo',emprestimoController.criarEmprestimo);



router.get('/acharUsuario',(req,res)=>{
    Usuario.find({})
    .exec()
    .then(usuarios => {
      res.status(200).send(JSON.stringify(usuarios));
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

//AREA DE LOGIN 

router.get('/login', (req, res)=>{
  res.send('Rota login/register funcionando')
})

router.post('/login/register', usuarioController.cadastrarUsuario)

router.post('/login/login', usuarioController.logarUsuario)





module.exports = router;

//http://localhost:3000/micachan/melinda/sarauiva/1999-10-2
//http://localhost:3000/user/12212121/pesado/9999999/@chinesl/roraima