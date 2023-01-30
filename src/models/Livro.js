const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
    ISBN: String,
    title: String,
    autor: String,
    ano: Number
});

const Livro = mongoose.model('Livro', LivroSchema);

module.exports = Livro;
    