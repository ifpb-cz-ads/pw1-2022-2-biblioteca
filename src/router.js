const express = require('express');
const router = express.Router();
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/userController');
const Usuario = require('./models/Usuario');



router.get('/api/buscaLivro',livroController.busca);

router.get('/api/buscaTexto',livroController.buscaTexto);

router.post('/api/criarLivro',livroController.criarLivro);

router.post('/api/cadastro',usuarioController.cadastrarUsuario);


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

// router.get('/acharLivro',(req,res)=>{
//     Livro.find({})
//     .exec()
//     .then(livros => {
//       res.status(200).send(JSON.stringify(livros));
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// })

// //criar emprestimo
// router.get('/teste/:id/:user/:dtEmp/:dtEntre/:dias',async(req,res)=>{
//   const id2 = await Livro.findById(req.params.id);
//   console.log(id2);
  
//   const idUser = await Usuario.findById(req.params.user);
//   console.log(idUser);

//   const novoEmprestimo = new Emprestimo({
//     dataEmprestimo: new Date(req.params.dtEmp),
//     dataEntrega: new Date(req.params.dtEntre),
//     livroId: id2,
//     usuarioId: idUser,
//     diasDesdeUltimoEmprestimo: req.params.dias
//   });
  
//   novoEmprestimo.save((err, result) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       // res.status(200).json({mensagem:result});
//       res.status(200).send(JSON.stringify(result));
//     }
//   });

// })

// router.get('/testeSenha/:senha',async (req,res)=>{

//   const senha =  await bcrypt.hash(req.params.senha, 10);
//   res.send(senha);
// });




module.exports = router;

//http://localhost:3000/micachan/melinda/sarauiva/1999-10-2
//http://localhost:3000/user/12212121/pesado/9999999/@chinesl/roraima

