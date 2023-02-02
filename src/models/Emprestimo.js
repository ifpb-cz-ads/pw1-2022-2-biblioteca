const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmprestimoSchema = new Schema({
    dataEmprestimo: Date,
    dataEntrega: Date,
    livro:[
        {type: Schema.Types.String, ref: "Livro"}
    ],
    usuario:[
        {type: Schema.Types.String,ref: "Usuario"}
    ],
    diasDesdeUltimoEmprestimo: Number
});


const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;

