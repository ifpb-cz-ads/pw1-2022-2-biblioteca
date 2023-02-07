const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const { loginReq } = require('../middlewares/middleware');

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

// async function logarUsuario(req, res){
//     const {email, senha} = req.body

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
    
//     if(req.body.senha == senha && req.body.email == email){
//         //logado
//         req.session.email = email;
//         req.session.senha = senha;
//     }

//     try {
//         const secret = `${process.env.SECRET}`
//         const token = jwt.sign(
//             {
//             id: user._id,
//             },
//             secret,
//         )
//         //
//         req.session.token = token;
//         res.redirect('/')
//     } catch (error) {
//         console.log(error);
//     }

// }

async function logarUsuario(req, res){
    try {
        const { email, senha } = req.body;
    
        const user = await Usuario.findOne({email:email});
    
        const match = await bcrypt.compare(senha, user.senha);
    
        if (match) {
          const token = await jwt.sign(
            { userId: user.id },
            process.env.SECRET_KEY,
            { expiresIn: 3600 } // 1h
          );
    
          const tokenBearer = `Bearer ${token}`;
    
          req.session.user = user;
    
          res.cookie('access_token', tokenBearer, { maxAge: 3600000 }); // 1h
          res.set('Authorization', tokenBearer);
          res.redirect('/');
        } else {
          console.log('Senha inválida.');
          req.flash('error', 'Senha inválida. Tente novamente.');
          res.redirect('/signup');
        }
      } catch (error) {
        console.log(error);
        req.flash('error', 'Usuário não cadastrado. Realize seu cadastro.');
        res.redirect('/signup');
      }

}




async function logoutUsuario(req, res){
    req.session.destroy();
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
  


module.exports = {cadastrarUsuario, logarUsuario, logoutUsuario,deleteAllUser};
