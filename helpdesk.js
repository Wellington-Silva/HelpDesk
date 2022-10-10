const x = require('./data.json');

/* Questão 1 
Quais são os chamados em aberto, identificando: número do chamado, data, filial chamadora, número identificador 
do equipamento envolvido e problema informado pela filial;
*/
function chamados() {
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
