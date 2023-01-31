const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmprestimoSchema = new Schema({
    dataEmprestimo: Date,
    dataEntrega: Date,
    livroId: String,
    usuarioId: String,
    diasDesdeUltimoEmprestimo: Number
});


const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;

