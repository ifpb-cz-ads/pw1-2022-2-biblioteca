const jtw = require('jsonwebtoken');
const Usuario = require('../models/Usuario')

exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user
  //res.locas.email = req.session.email
  next();

}

exports.loginReq = async(req, res, next)=>{
  const token = req.headers.authorization;

  jtw.verify(token, process.env.SECRET, (err)=>{
    if(err){
      console.log("Erro ao pegar emprestimo, sujeito deve realizar login")
      res.redirect('/api/logar')
    }
    return next()
  })
    
  next();
}

