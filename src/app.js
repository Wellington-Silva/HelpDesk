const express = require('express');
const app = express();
const PORT = 3000;

const {
  chamados,
  funcionarios,
  filiais,
  tecnicos,
  equipamentos
} = require('./data/data.json');

app.get('/test', (req, res) => res.json(filiais));

/* Questão 1 
Quais são os chamados em aberto, identificando: número do chamado, data, filial chamadora, número identificador 
do equipamento envolvido e problema informado pela filial;
*/
app.get('/q1', (req, res) => {
  const result = chamados.filter(chamado => chamado.status.toLocaleLowerCase() === "aberto")
  const data = result.map(r => {
    return {
      numero: r._id,
      data: r.dt_start,
      filial: r.filial_id,
      equipamento: r.equipment_id,
      problema: r.problem
    }
  })
  res.status(200).json(data)
});

/* Questão 2 
Quais são os equipamentos existentes em cada filial, indicando para cada filial:
endereço da filial e seus equipamentos (número do equipamento, tipo de equipamento
e data de instalação na filial;
*/
app.get('/q2', (req, res) => {
  let equips;
  const result = filiais.map(filial => {
    equips = equipamentos.filter(e => e.filial_id === filial._id);
    return {
      filial: filial.name,
      endereco: filial.address,
      equipamentos: equips
    };
  });
  res.status(200).json(result);
});

/* Questão 3 
Quais são os chamados com status de encerrado, indicando: número de cada chamado,
data de abertura e data de conclusão do mesmo;
*/
app.get('/q3', (req, res) => {
  const result = chamados.filter(chamado => chamado.status.toLocaleLowerCase() === "fechado")
  const data = result.map(r => { return { numero: r._id, abertura: r.dt_start, conclusao: r.dt_end } })
  res.status(200).json(data)
});

/* Questão 4 
Quais foram os técnicos do HelpDesk que mais atenderam chamados em cada mês do
ano corrente (nome do técnico e quantidade de chamados atendidos com conclusão);
*/
app.get('/q4', (req, res) => {
  let resultado = {
    jan: { nome: "", qtd: 0 },
    fev: { nome: "", qtd: 0 },
    mar: { nome: "", qtd: 0 },
    abr: { nome: "", qtd: 0 },
    mai: { nome: "", qtd: 0 },
    jun: { nome: "", qtd: 0 },
    jul: { nome: "", qtd: 0 },
    ago: { nome: "", qtd: 0 },
    set: { nome: "", qtd: 0 },
    out: { nome: "", qtd: 0 },
    nov: { nome: "", qtd: 0 },
    dez: { nome: "", qtd: 0 },
  };

  tecnicos.map((t, i) => {
    if (t.calls_resolved_month.jan > resultado.jan.qtd)
      resultado = { ...resultado, jan: { nome: t.name, qtd: t.calls_resolved_month.jan } }

    if (t.calls_resolved_month.fev > resultado.fev.qtd)
      resultado = { ...resultado, fev: { nome: t.name, qtd: t.calls_resolved_month.fev } }

    if (t.calls_resolved_month.mar > resultado.mar.qtd)
      resultado = { ...resultado, mar: { nome: t.name, qtd: t.calls_resolved_month.mar } }

    if (t.calls_resolved_month.abr > resultado.abr.qtd)
      resultado = { ...resultado, abr: { nome: t.name, qtd: t.calls_resolved_month.abr } }

    if (t.calls_resolved_month.mai > resultado.mai.qtd)
      resultado = { ...resultado, mai: { nome: t.name, qtd: t.calls_resolved_month.mai } }

    if (t.calls_resolved_month.jun > resultado.jun.qtd)
      resultado = { ...resultado, jun: { nome: t.name, qtd: t.calls_resolved_month.jun } }

    if (t.calls_resolved_month.jul > resultado.jul.qtd)
      resultado = { ...resultado, jul: { nome: t.name, qtd: t.calls_resolved_month.jul } }

    if (t.calls_resolved_month.ago > resultado.ago.qtd)
      resultado = { ...resultado, ago: { nome: t.name, qtd: t.calls_resolved_month.ago } }

    if (t.calls_resolved_month.set > resultado.set.qtd)
      resultado = { ...resultado, set: { nome: t.name, qtd: t.calls_resolved_month.set } }

    if (t.calls_resolved_month.out > resultado.out.qtd)
      resultado = { ...resultado, out: { nome: t.name, qtd: t.calls_resolved_month.out } }

    if (t.calls_resolved_month.nov > resultado.nov.qtd)
      resultado = { ...resultado, nov: { nome: t.name, qtd: t.calls_resolved_month.nov } }

    if (t.calls_resolved_month.dez > resultado.dez.qtd)
      resultado = { ...resultado, dez: { nome: t.name, qtd: t.calls_resolved_month.dez } }
  });
  res.status(200).json(resultado);
});

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