const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
    ISBN: String,
    title: String,
    autor: String,
    ano: Number,
		capa: String
});

LivroSchema.index({ title: 'text', autor: 'text' }, { weights: { title: 2, content: 1 } });

const Livro = mongoose.model('Livro', LivroSchema);


module.exports = Livro;
