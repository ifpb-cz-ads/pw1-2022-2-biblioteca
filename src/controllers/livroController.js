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
		const {titulo, autor, anoLancamento, isbn} = req.body;

    const {isbn, titulo,autor ,ano} = req.body;

    const novoLivro = new Livro({
        ISBN: isbn,
        title: titulo,
        autor: autor,
        ano: new Date(anoLancamento)
      });
      
    novoLivro.save((err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json({menssagem:result});
        }
    });

}

// Frontend
	// Página inicial / livros (?)
	async function index(req, res){
		try{
			const books = await Livro.find({});
			console.log(books);
			res.render('index', {books});
		} catch(err){
			console.log(err);
			res.status(404).send('Não foi possível encontrar os livros!');
		}
	}

module.exports = {busca , buscaTexto, criarLivro, index}; 
