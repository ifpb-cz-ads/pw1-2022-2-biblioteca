const Emprestimo = require('../models/Emprestimo');
const Livro = require('../models/Livro');
const Usuario = require('../models/Usuario');


async function criarEmprestimo(req,res){

    // const {ISBN, email} = req.body;
    const ISBN = "micachan";
    const email = req.session.email;

    const novoEmprestimo = new Emprestimo({
        dataEmprestimo: new Date(),
        dataEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        livro: [ISBN],
        usuario: [email],
        diasDesdeUltimoEmprestimo: 0
    });
      
    try{
        await novoEmprestimo.save();
        res.status(200).json({msg:"Emprestimo realizado com sucesso"});
    }
    catch(e){
        console.log(e);
    }
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
    res.json(emprestimo );
}
catch(e){
    console.log(e);
    res.status(404).send(`Não foi possivel encontrar sua busca`);
}

}
  

module.exports={criarEmprestimo,deleteAllEmprestimos,todosEmprestimos};