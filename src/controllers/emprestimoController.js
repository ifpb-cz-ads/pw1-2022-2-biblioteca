const Emprestimo = require('../models/Emprestimo');
const Usuario = require('../models/Usuario')
const path = require('path')


async function criarEmprestimo(req,res){

    // const id = "63e1aab9a888e62f2cf4da85"; 
    // const user = await Usuario.findOne({email:req.session.user.email});
    // console.log(user.id);

    // const novoEmprestimo = new Emprestimo({
    //     dataEmprestimo: new Date(),
    //     dataEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //     livro: [id],
    //     usuario: [user.id],
    //     diasDesdeUltimoEmprestimo: 0
    // });
      
    // try{
    //     await novoEmprestimo.save();
    //     res.status(200).json({msg:"Emprestimo realizado com sucesso"});
    // }
    // catch(e){
    //     console.log(e);
    // }
    console.log("acertou");
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

async function emprestimoUser(req, res) {

  try {
    const email = req.session.email;
    const emprestimos = await Emprestimo.find({ "usuario": email }).populate('livro');
  
    console.log(emprestimos);
    res.send(emprestimos);
  } catch (err) {
    console.error(err);
    res.send("Erro ao buscar empréstimos do usuário");
  }
}


  
  

module.exports={criarEmprestimo,deleteAllEmprestimos,todosEmprestimos,emprestimoUser};