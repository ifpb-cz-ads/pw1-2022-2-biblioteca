const Usuario = require("../models/Usuario");

exports.checkToken = (req, res, next) => {
    const userHeader = req.headers['authorization']
    const token = userHeader && userHeader.split(" ")[1]

    const user = Usuario.findById(id, '-senha')

    if(!user){
      return res.status(401).json ({msg: 'Acesso recusado'})
    }
  
    try {
      const secret = process.env.SECRET
      jwt.verify (token, secret)
      next()

    } catch (error) {
      console.log(error)
    }

  };
