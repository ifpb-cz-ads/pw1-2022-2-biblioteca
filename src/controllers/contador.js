const cron = require('node-cron');
const Emprestimo = require('../models/Emprestimo');

const contador = cron.schedule('* * * * *', async () => {
  
    const emprestimos = await Emprestimo.find();

    // Aumentar o contador de diasDesdeUltimoEmprestimo em 1 para cada documento
    emprestimos.forEach(async emprestimo => {
      emprestimo.diasDesdeUltimoEmprestimo++;
        console.log(emprestimo.diasDesdeUltimoEmprestimo);
      await emprestimo.save();
    });

    
});


module.exports={contador}