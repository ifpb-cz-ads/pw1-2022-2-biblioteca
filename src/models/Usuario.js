const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    matricula: String,
    categoria: String,
    nome: String,
    telefone: String,
    email: String,
    estado: String
  });

UsuarioSchema.methods.pedirEmprestimo = async function(livro) {
  const Emprestimo = require('./Emprestimo');
  const dataEmprestimo = new Date();
  const dataEntrega = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));
  const diasDesdeUltimoEmprestimo = 0;
  const emprestimo = new Emprestimo({
    dataEmprestimo,
    dataEntrega,
    livro,
    usuario: this,
    diasDesdeUltimoEmprestimo
  });
  await emprestimo.save();
  return emprestimo;
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;


