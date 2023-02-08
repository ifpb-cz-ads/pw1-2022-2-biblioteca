const cron = require('node-cron');
const Emprestimo = require('../models/Emprestimo');
const Usuario = require('../models/Usuario');

const contador = cron.schedule('0 0 * * *', async () => {
  
  const emprestimos = await Emprestimo.find();
  
  // Aumentar o contador de diasDesdeUltimoEmprestimo em 1 para cada documento
  emprestimos.forEach(async emprestimo => {
    emprestimo.diasDesdeUltimoEmprestimo++;
    
    if (emprestimo.diasDesdeUltimoEmprestimo > 7) {
      // Mude o status do usuário para pendente
      const usuario = await Usuario.findById(emprestimo.usuario);
      console.log(emprestimo.usuario);
      usuario.estado = "Pendente";
      await usuario.save();
    }
  
    console.log(emprestimo.diasDesdeUltimoEmprestimo);
    await emprestimo.save();
  });
  
});


module.exports={contador}