const anoAtual = document.querySelector('#anoAtual');
const ultimaModificacao = document.querySelector('#ultimaModificacao');

const hoje = new Date();
anoAtual.innerHTML = hoje.getFullYear();

ultimaModificacao.innerHTML = `Última modificação: ${document.lastModified}`;