const anoAtual = document.querySelector('#anoAtual');
const ultimaModificacao = document.querySelector('#ultimaModificacao');

const hoje = new Date();
if (anoAtual) {
    anoAtual.innerHTML = hoje.getFullYear();
}

if (ultimaModificacao) {
    ultimaModificacao.innerHTML = `Última modificação: ${document.lastModified}`;
}

const bmenu = document.querySelector('#bmenu');
const nav = document.querySelector('nav');

if (bmenu && nav) {
    bmenu.addEventListener('click', () => {
        nav.classList.toggle('exibir');
    });
}