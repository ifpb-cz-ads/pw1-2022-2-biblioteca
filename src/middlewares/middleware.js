const e = require('connect-flash');
const jtw = require('jsonwebtoken');
const Usuario = require('../models/Usuario')

exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user
  //res.locas.email = req.session.email
  next();

}

exports.loginReq = async(req, res, next)=>{
  const {access_token} = req.cookies

  if(access_token){
    try {
      const [, token] = access_token.split(' ');
      await jtw.verify(token, process.env.SECRET)
      next()
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
    }else{
      console.log('acesso negado')
}

};

  