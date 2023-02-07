const Usuario = require('../models/Usuario')

exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.teste = req.session.user.email;

  // try{
  //   res.locals.user = req.session.user;
  //   const user = await Usuario.findOne({email:req.session.user.email});
  //   console.log(user.id);
  //   next();

  // }catch(e){
  //   console.log(e);
  //   next();
  // }

  


  // res.locals.errors = req.flash('error');
  // res.locals.infos = req.flash('info');
  next();

}


exports.loginReq = async(req, res, next) => {
    
    if(!req.locals.teste){
      await req.locals.save(()=>{
        res.redirect('/api/logar');
        
      })
    }
    next();
  };




