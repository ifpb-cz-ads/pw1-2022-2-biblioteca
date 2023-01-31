const api = require('express').Router();

api.get('/teste', (req, res) => {
    res.send('Mensagem');
});

module.exports = api;
