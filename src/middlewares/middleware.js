const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.check = (req, res, next) => {
    const userHeader = req.headers['authorization']

    console.log(userHeader)

  };

