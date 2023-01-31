const mongoose = require('mongoose');
const Usuario = require('./Usuario').schema;
const Livro = require('./Livro').schema;
const Schema = mongoose.Schema;


const EmprestimoSchema = new Schema({
    dataEmprestimo: Date,
    dataEntrega: Date,
    livro: {type: [Livro]},
    usuario: {type: [Usuario]},
    diasDesdeUltimoEmprestimo: Number,
});


const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;