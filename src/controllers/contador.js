const cron = require('node-cron');
const Emprestimo = require('../models/Emprestimo');
const Usuario = require('../models/Usuario');

const contador = cron.schedule('0 0 * * *', async () => {
  
  const emprestimos = await Emprestimo.find();

  emprestimos.forEach(async emprestimo => {

    const diaEntrega = new Date(emprestimo.dataEntrega).getDate();
    const diaEmprestimo = new Date(emprestimo.dataEmprestimo).getDate();
    const diasParaVencer = diaEntrega - diaEmprestimo;

    emprestimo.diasDesdeUltimoEmprestimo++;

    if (emprestimo.diasDesdeUltimoEmprestimo > diasParaVencer) {
      // Mude o status do usuário para pendente
      const usuario = await Usuario.findById(emprestimo.usuario);
      usuario.estado = "Pendente";
      await usuario.save();
    }
  
    console.log(emprestimo.diasDesdeUltimoEmprestimo);
    await emprestimo.save();
  });
  
});


module.exports={contador}