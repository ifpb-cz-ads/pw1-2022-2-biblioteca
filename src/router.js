const express = require('express');
const router = express.Router();
const Livro = require('./models/Livro');
const Usuario = require('./models/Usuario');
const loginController = require('./controllers/loginController.js')
//const Emprestimo = require('./models/Emprestimo');


router.get('/', (req, res)=>{
  res.send("Rota funcionando")
})

router.get('/:nome/:titulo/:autor/:anoLancamento',(req,res)=>{

    const novoLivro = new Livro({
        ISBN: req.params.nome,
        title: req.params.titulo,
        autor: req.params.autor,
        ano: new Date(req.params.anoLancamento)
      });
      
      novoLivro.save((err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json({menssagem:result});
        }
      });
});

router.get('/user/:matricula/:categoria/:telefone/:email/:estado',(req,res)=>{

    const novoUsuario = new Usuario({
        matricula: req.params.matricula,
        categoria: req.params.categoria,
        telefone: req.params.telefone,
        email: req.params.email,
        estado: req.params.estado
      });
      
      novoUsuario.save((err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json({mensagem:result});
        }
      });
});

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

router.get('/acharLivro',(req,res)=>{
    Livro.find({})
    .exec()
    .then(livros => {
      res.status(200).send(JSON.stringify(livros));
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

router.get("/login/index", loginController.index)

//AREA DE LOGIN 






module.exports = router;

//http://localhost:3000/micachan/melinda/sarauiva/1999-10-2
//http://localhost:3000/user/12212121/pesado/9999999/@chinesl/roraima