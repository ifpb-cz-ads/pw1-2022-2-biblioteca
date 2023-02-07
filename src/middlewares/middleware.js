exports.middlewareGlobal = (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.email = req.session.email;
  // res.locals.errors = req.flash('error');
  // res.locals.infos = req.flash('info');
  next();
  };

exports.loginReq = (req, res, next) => {
    if(!req.session.email){
      req.session.save(()=>{
        res.redirect('/')
        return
      })
    }
    next();
  };




