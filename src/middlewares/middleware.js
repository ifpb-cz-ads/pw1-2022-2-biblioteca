const e = require('connect-flash');
const jtw = require('jsonwebtoken');

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
      console.log('Acesso autorizado')
      next()
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
    }else{
      req.session.user = null
      console.log('Acesso negado, necessário realizar login')
      return res.redirect('/api/logar')
}

};

  