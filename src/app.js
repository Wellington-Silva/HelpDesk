const express = require('express');
const app = express();
const PORT = 3000;

const { chamados, funcionarios, filiais, tecnicos, equipamentos } = require('./data/data.json');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/test', (req, res) => res.json(filiais));

/* Questão 1 
Quais são os chamados em aberto, identificando: número do chamado, data, filial chamadora, número identificador 
do equipamento envolvido e problema informado pela filial;
*/
function chamado() {
  console.log(x.user.name)
}

/* Questão 2 
Quais são os equipamentos existentes em cada filial, indicando para cada filial:
endereço da filial e seus equipamentos (número do equipamento, tipo de equipamento
e data de instalação na filial;
*/
function equipamentos_existentes() {
  console.log(x.equipamento)
}


/* Questão 3 
Quais são os chamados com status de encerrado, indicando: número de cada chamado,
data de abertura e data de conclusão do mesmo;
*/

/* Questão 4 
Quais foram os técnicos do HelpDesk que mais atenderam chamados em cada mês do
ano corrente (nome do técnico e quantidade de chamados atendidos com conclusão);
*/

/* Questão 5 
Dado um determinado chamado, qual a solução dada para o mesmo.
*/

app.get('/q5/:idchamado', (req, res) => {
  const { idchamado } = req.params;
  const chamado = chamados.find(chamado => chamado._id === parseInt(idchamado));
  if (chamado) {
    Boolean(chamado.solution)
      ? res.status(200).json({ solucao: chamado.solution })
      : res.status(400).json({ error: true, message: "O chamado ainda não possui solução" });
  } else res.status(404).json({ error: true, message: "Chamado não encontrado." });
});

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));