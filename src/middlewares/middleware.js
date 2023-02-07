const jwt = require('jsonwebtoken');


exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user;
  // res.locals.teste = req.session.user.email;

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


// exports.loginReq = async(req, res, next) => {
    
//     if(!req.locals.teste){
//       await req.locals.save(()=>{
//         res.redirect('/api/logar');
        
//       })
//     }
//     next();
//   };

exports.loginReq= (req, res, next) => {
  const bearerHeader = req.cookies && req.cookies['access_token'] || req.headers.authorization;
  
  if (!bearerHeader) {
    return res.status(401).json({ message: 'Token não encontrado.' });
  }
  
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  
  try {
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Não autorizado.' });
  }
};

  


