const mongoose = require('mongoose');
const Usuario = require('./Usuario');
const Livro = require('./Livro');
const Schema = mongoose.Schema;

const EmprestimoSchema = new Schema({
    dataEmprestimo: Date,
    dataEntrega: Date,
    livro: Livro,
    usuario: Usuario,
    diasDesdeUltimoEmprestimo: Number
});

const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;