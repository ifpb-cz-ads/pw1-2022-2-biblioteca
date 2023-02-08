const Livro = require('../models/Livro');
const Emprestimo = require('../models/Emprestimo');

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
		const {query} = req.query;
		
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
async function deleteLivro(req, res) {
  try {
    const livro = await Livro.findByIdAndRemove(req.body.id);

    if (!livro) {
      return res.send("Livro não encontrado");
    }

    res.send("Livro deletado com sucesso");
  } catch (err) {
    console.error(err);
    res.send("Erro ao deletar livro");
  }
}
// Frontend
	// Página inicial / livros (?)
	async function index(req, res){
		try{
			const books = await Livro.find({});
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
  	try {
    	const emprestimos = await Emprestimo.find({ "usuario": req.session.user._id });

			let books = [];

			for(let emprestimo of emprestimos){
				let book = await Livro.findById(emprestimo.livro);
				books.push(book);
			}

			res.render('livrosEmprestados', {books})
  	} catch (err) {
    	console.error(err);
    	res.send("Erro ao buscar empréstimos do usuário");
  	}
	}

	// Mostrar busca texto
	async function buscaTextual(req, res){
		const {query} = req.query;
		
    try{
        const books  = await Livro.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });

        if(books.length == 0){
            res.redirect("/");
        }
        else{
            res.render('index', {books});
        }
    }

    catch(e){
        console.log(e);
        res.status(404).send(`Não foi possivel encontrar sua busca`);
    }
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

module.exports = {busca , buscaTexto, buscaTextual,criarLivro, index, bookForm,livrosEmprestados,deleteLivro,deleteAllLivros}; 
