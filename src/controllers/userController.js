const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function cadastrarUsuario(req,res){
  
    const { nome, email, matricula, telefone, categoria, senha, confirmarSenha} = req.body;

    const usuarioExiste = await Usuario.findOne({email:email});

    if(usuarioExiste){
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
        
    }
    catch(e){
        console.log(e);
    }
    res.redirect('/')
}


async function logarUsuario(req, res){
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({email: email});

    const match = await bcrypt.compare(senha, user.senha);

    if (match) {
      const token = await jwt.sign(
        { userId: user._id },
        process.env.SECRET,
        { expiresIn: 3600 } // 1h
      );

      const tokenBearer = `Bearer ${token}`;

      req.session.user = user;

      res.cookie('access_token', tokenBearer, { maxAge: 3600000 }); // 1h
      res.set('Authorization', tokenBearer);
      res.redirect('/');
    } else {
      console.log('Senha inválida.');
      res.redirect('/api/logar');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/api/logar');
  }
};

async function getAllUser(req,res){
  
  try {
    const usuarios = await Usuario.find({}, '-senha');
  
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.send("Erro ao pegar usuários");
  }
  
}

async function logoutUsuario(req, res){
    await req.session.destroy();
    res.clearCookie('access_token');
    res.redirect('/')
}


// deletar usuario   
async function deleteAllUser(req,res){
    try {
      await Usuario.deleteMany({});
      console.log("Todos os usuarios foram deletados com sucesso");
    } catch (err) {
      console.error(err);
    }

    res.send("Ok");
  };

  

module.exports = {cadastrarUsuario, logarUsuario, logoutUsuario,deleteAllUser,getAllUser};
