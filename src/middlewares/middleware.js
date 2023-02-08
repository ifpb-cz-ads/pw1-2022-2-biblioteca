const jtw = require('jsonwebtoken');
const Usuario = require('../models/Usuario')
const usercontroler = require('../controllers/userController')

exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user
  //res.locals.errors = req.flash('error');
  //res.locas.email = req.session.email
  next();

}

exports.loginReq = async(req, res, next)=>{
  console.log('rota login')
  const { access_token } = req.cookies
  const msg = 'Você precisa se autenticar para acessar essa página.';
  console.log('access_token: ', access_token)
  if (access_token) {
    try {
      const [token] = access_token.split(' ');
      await jwt.verify(token, process.env.SECRET);
      console.log('teste de acc e req',access_token, req.cookies);
      res.redirect('/api/book-page');
      return next();
    } catch (e) {
      req.session.user = null; // session's over

      return res.redirect('/api/logar');
    }
  } else {
    req.session.user = null; // session's over
    return res.redirect('/api/logar');
  }

};

  // const token = req.headers['x-acess-token'];
  // console.log(token, 'token loginreq')
  // await jtw.verify(token, process.env.SECRET, (err)=>{
  //   if(err){
  //     console.log("Erro: ", err)
  //     res.redirect('/api/logar')
  //   }
  //   return next()
  // })
    
  // next();
// }

