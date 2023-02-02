const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const { loginReq } = require('../middlewares/middleware');

async function cadastrarUsuario(req,res){
  
    const { nome, email, senha, confirmarSenha} = req.body;
    console.log(req.body);

//matricula, categoria, telefone

    /*if(!matricula){
        return res.status(422).json({msg: "A matricula é obrigatoria"});
    }*/

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
        /*matricula: matricula,
        categoria: categoria,*/
        nome: nome,
        //telefone: telefone,
        email: email,
        //estado: "ok",
        senha: password
    });

    try{
        await novoUsuario.save();
        
    }
    catch(e){
        console.log(e);
    }
    res.redirect('/')
}

async function logarUsuario(req, res){
    const {email, senha} = req.body

    if(!email){
        return res.status(422).json({msg: "O email é obrigatorio"});
    }

    if(!senha){
        return res.status(422).json({msg: "A senha é obrigatoria"});
    }

    //Checkando se o usuário está cadastrado
    const user = await Usuario.findOne({email:email});

    if(!user){
        return res.status(404).json({msg:"Usuário não encontrado"});
    }

    //Checkando se a senha está correta
    const checkPassword = await bcrypt.compare(senha, user.senha)
    if(!checkPassword){
        return res.status(422).json({msg: 'Senha inválida'})
    }
    
    if(req.body.senha == senha && req.body.email == email){
        //logado
        req.session.email = email;
        req.session.senha = senha;
    }

    try {
        const secret = `${process.env.SECRET}`
        const token = jwt.sign(
            {
            id: user._id,
            },
            secret,
        )
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }

}


async function logoutUsuario(req, res){
    req.session.destroy();
    res.redirect('/')
}

module.exports = {cadastrarUsuario, logarUsuario, logoutUsuario};