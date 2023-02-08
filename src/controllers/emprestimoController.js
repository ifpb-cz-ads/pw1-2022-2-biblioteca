const Emprestimo = require('../models/Emprestimo');
const Usuario = require('../models/Usuario')

async function criarEmprestimo(req,res, ){

      const {id} = req.body;
      const user = await Usuario.findById(req.session.user._id);

      const novoEmprestimo = new Emprestimo({
        dataEmprestimo: new Date(),
        dataEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        livro: [id],
        usuario: [user.id],
        diasDesdeUltimoEmprestimo: 0
      });

      await novoEmprestimo.save();
      res.redirect('/livros')
}

async function deleteAllEmprestimos(req,res){
    try {
      await Emprestimo.deleteMany({});
      console.log("Todos os empréstimos foram deletados com sucesso");
    } catch (err) {
      console.error(err);
    }

    res.send("Ok");
};

async function todosEmprestimos(req,res){

  try{
    const emprestimo = await Emprestimo.find({});
    res.json(emprestimo);
}
catch(e){
    console.log(e);
    res.status(404).send(`Não foi possivel encontrar sua busca`);
}

}

async function emprestimoUser(req, res) {
  try {

    const emprestimos = await Emprestimo.find({ "usuario": req.session.user._id }).populate("livro");

    console.log(emprestimos);
    res.send(emprestimos);
  } catch (err) {
    console.error(err);
    res.send("Erro ao buscar empréstimos do usuário");
  }
}

async function deleteEmprestimo(req, res) {

  const id = req.body.id;

  try {
    const emprestimo = await Emprestimo.findById(id);
    console.log(emprestimo)
    if (!emprestimo){
      return res.status(404).send("Empréstimo não encontrado");
    } 
    await emprestimo.remove();
    res.json({msg:"Empréstimo excluído com sucesso"});

    const user = await Usuario.findById(req.session.user._id);
    const outrosEmprestimos = await Emprestimo.findById(user.id);

    if (outrosEmprestimos.length === 0) {
      user.estado = "ok";
      await usuario.save();
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({msg:"Erro ao excluir o empréstimo"});
  }
}



module.exports={criarEmprestimo,deleteAllEmprestimos,todosEmprestimos,emprestimoUser,deleteEmprestimo};
