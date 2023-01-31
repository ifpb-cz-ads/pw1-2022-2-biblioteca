const Livro = require('../models/Livro');

async function busca (req,res){

    try{
        const livros = await Livro.find({});
        res.json(livros);
    }
    catch(e){
        console.log(e);
        res.status(404).send(`Não foi possivel encontrar sua busca`);
    }
}

async function buscaTexto(req,res){

   
    const query = req.query.texto;
    
    try{
        const livro  = await Livro.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });

        if(livro.length == 0){
            res.redirect("/api/buscaLivro");
        }
        else{
            res.json(livro);
        }
    }

    catch(e){
        console.log(e);
        res.status(404).send(`Não foi possivel encontrar sua busca`);
    }

}

async function criarLivro(req,res){

    const novoLivro = new Livro({
        ISBN: req.query.isbm,
        title: req.query.titulo,
        autor: req.query.autor,
        ano: new Date(req.query.anoLancamento)
      });
      
    novoLivro.save((err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json({menssagem:result});
        }
    });

}


module.exports = {busca , buscaTexto,criarLivro}; 