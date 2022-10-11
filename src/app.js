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

});

/* Questão 5 
Dado um determinado chamado, qual a solução dada para o mesmo.
 */

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));