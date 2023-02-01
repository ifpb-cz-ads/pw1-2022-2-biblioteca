const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


async function cadastrarUsuario(req,res){
  
    const {matricula, categoria ,nome, telefone, email, senha, confirmarSenha} = req.query;

    if(!matricula){
        return res.status(422).json({msg: "A matricula é obrigatoria"});
    }

    if(!nome){
        return res.status(422).json({msg: "O nome é obrigatorio"});
    }

    if(!email){
        return res.status(422).json({msg: "O email é obrigatorio"});
    }

    if(!senha){
        return res.status(422).json({msg: "A senha é obrigatoria"});
    }

    if(!confirmarSenha){
        return res.status(422).json({msg: "Confirmar a senha é obrigatorio"});   
    }

    if(senha != confirmarSenha){
        return res.status(422).json({msg: "Senhas diferentes"});   
    }

    const ususuarioExiste = await Usuario.findOne({email:email});

    if(ususuarioExiste){
        return res.status(422).json({msg:"Email ja cadastrado, insira outro e-mail"});
    }

    const saltos = await bcrypt.genSalt(12);
    const password = await  bcrypt.hash(senha, saltos);

    const novoUsuario = new Usuario({
        matricula: matricula,
        categoria: categoria,
        nome: nome,
        telefone: telefone,
        email: email,
        estado: "ok",
        senha: password
    });

    try{
        await novoUsuario.save();
        res.status(200).json({msg:"Usuario criado com sucesso"});
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {cadastrarUsuario};