const jtw = require('jsonwebtoken');
const Usuario = require('../models/Usuario')

exports.middlewareGlobal = async (req, res, next) => {
  res.locals.user = req.session.user
  //res.locas.email = req.session.email
  next();

}

exports.loginReq = async(req, res, next)=>{
	const {access_token} = req.cookies;

	const [, token] = access_token.split(' ');

  try {
    const [, token] = access_token.split(' ');
    await jwt.verify(token, process.env.SECRET);

    return next()
  } catch (e) {
    req.session.user = null;
    return res.redirect('/api/logar');
  }

}

