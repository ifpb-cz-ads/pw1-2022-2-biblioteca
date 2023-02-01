const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    matricula: String,
    categoria: String,
    nome: String,
    telefone: String,
    email: String,
    estado: String,
    senha: String
  });


const Usuario = mongoose.model('Usuario', UsuarioSchema);


module.exports = Usuario;


