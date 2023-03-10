const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmprestimoSchema = new Schema({
    dataEmprestimo: Date,
    dataEntrega: Date,
    livro:[
        {type: Schema.Types.ObjectId, ref: "Livro"}
    ],
    usuario:[
        {type: Schema.Types.ObjectId,ref: "Usuario"}
    ],
    diasDesdeUltimoEmprestimo: Number
});


const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;

