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

module.exports={criarEmprestimo};