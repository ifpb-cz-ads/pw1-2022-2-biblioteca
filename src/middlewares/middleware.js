const jtw = require('jsonwebtoken');
const Usuario = require('../models/Usuario')
const usercontroler = require('../controllers/userController')

exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user
  //res.locals.errors = req.flash('error');
  //res.locas.email = req.session.email
  next();

}



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

