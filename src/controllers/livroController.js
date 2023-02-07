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
		const imagem = `/imgs/${req.file.filename}`;
		console.log(imagem);

    const novoLivro = new Livro({
        ISBN: isbn,
        title: titulo,
        autor: autor,
        ano: new Date(anoLancamento),
				capa: imagem
      });
      
    novoLivro.save((err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json({mensagem:result});
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

	// Criar livro
	async function bookForm(req, res){
		res.render('bookForm');
	}

  // Ver livros emprestados
	async function livrosEmprestados(req, res) {
		const books = await Livro.find({});
		res.render('livrosEmprestados', {books})
	}


// deletar livros    
async function deleteAllLivros(req,res){
    try {
      await Livro.deleteMany({});
      console.log("Todos os livros foram deletados com sucesso");
    } catch (err) {
      console.error(err);
    }

    res.send("Ok");
  };
  




module.exports = {busca , buscaTexto, criarLivro, index, bookForm,livrosEmprestados,deleteAllLivros}; 
