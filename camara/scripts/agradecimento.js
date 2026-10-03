const urlParams = new URLSearchParams(window.location.search);
const resultadoForm = document.getElementById('resultado-form');

if (resultadoForm && urlParams.has('nome')) {
    resultadoForm.innerHTML = `
        <p><strong>Nome Completo:</strong> ${urlParams.get('nome')} ${urlParams.get('sobrenome')}</p>
        <p><strong>E-mail:</strong> ${urlParams.get('email')}</p>
        <p><strong>Celular:</strong> ${urlParams.get('celular')}</p>
        <p><strong>Organização:</strong> ${urlParams.get('organizacao')}</p>
        <p><strong>Data da Solicitação:</strong> ${urlParams.get('timestamp')}</p>
    `;
}