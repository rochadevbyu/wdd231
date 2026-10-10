// scripts/sobre.js
import { lugares } from '../dados/descubra.mjs';

const painelMensagem = document.querySelector('#mensagem-visita');
const dataUltimaVisita = localStorage.getItem('ultimaVisitaCamara');
const dataAtual = Date.now();

if (!dataUltimaVisita) {
    painelMensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
} else {
    const diferencaMilissegundos = dataAtual - parseInt(dataUltimaVisita);
    const diasPassados = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));

    if (diasPassados < 1) {
        painelMensagem.textContent = "Já voltou? Que legal!";
    } else {
        const palavraDia = diasPassados === 1 ? "dia" : "dias";
        painelMensagem.textContent = `Seu último acesso foi há ${diasPassados} ${palavraDia}.`;
    }
}
localStorage.setItem('ultimaVisitaCamara', dataAtual);


const galeria = document.querySelector('#galeria-descubra');

function exibirLugares(lista) {
    galeria.innerHTML = '';
    
    lista.forEach((lugar, index) => {
        let cartao = document.createElement('div');
        cartao.classList.add('cartao-lugar', `card-${index + 1}`);
        
        cartao.innerHTML = `
            <h2>${lugar.nome}</h2>
            <figure>
                <img src="imagens/${lugar.foto}" alt="${lugar.nome}" loading="lazy" width="300" height="200">
            </figure>
            <address>${lugar.endereco}</address>
            <p>${lugar.descricao}</p>
            <button class="btn-saiba-mais">Saiba mais</button>
        `;
        
        galeria.appendChild(cartao);
    });
}

exibirLugares(lugares);