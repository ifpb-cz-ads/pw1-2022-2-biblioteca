const cron = require('node-cron');
const Emprestimo = require('../models/Emprestimo');
const Usuario = require('../models/Usuario');

const contador = cron.schedule('* * * * *', async () => {
  
  const emprestimos = await Emprestimo.find();

  // Aumentar o contador de diasDesdeUltimoEmprestimo em 1 para cada documento
  emprestimos.forEach(async emprestimo => {
    // emprestimo.diasDesdeUltimoEmprestimo++;
    emprestimo.diasDesdeUltimoEmprestimo+=7;
    
    if (emprestimo.dataEmprestimo > emprestimo.dataEntrega) {
      // Mude o status do usuário para pendente
      const usuario = await Usuario.findById(emprestimo.usuario);
      usuario.status = "Pendente";
      await usuario.save();
    }
  
    console.log(emprestimo.diasDesdeUltimoEmprestimo);
    await emprestimo.save();
  });
  
});


//um dia
// const contador = cron.schedule('0 0 * * *', async () => {
//   const emprestimos = await Emprestimo.find();

//   emprestimos.forEach(async emprestimo => {
//     emprestimo.diasDesdeUltimoEmprestimo++;
//     console.log(emprestimo.diasDesdeUltimoEmprestimo);
//     await emprestimo.save();
//   });
// });

module.exports={contador}