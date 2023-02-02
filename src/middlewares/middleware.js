const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.middlewareGlobal = (req, res, next) => {
    res.locals.email = req.session.email;
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
