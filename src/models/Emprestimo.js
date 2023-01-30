const mongoose = require('mongoose');
const Livro = require('./Livro');
const Usuario = require('./usuario');
const Schema = mongoose.Schema;

const EmprestimoSchema = new Schema({
    dataEmprestimo: Date,
    dataEntrega: Date,
    livro: { type: Livro.LivroSchema, required: true },
    usuario: { type: Usuario.UsuarioSchema, required: true },
    diasDesdeUltimoEmprestimo: Number
});

const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;