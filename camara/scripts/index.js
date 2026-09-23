const mLocalizacao = document.querySelector('#clima-atual');
const mListaPrevisao = document.querySelector('#lista-previsao');

const apiKey = '7ea3d2322a5b7747493a60d727102475'; 
const lat = '-8.02';
const lon = '-34.9';

const urlAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

async function carregarClima() {
    try {
        
        const respostaAtual = await fetch(urlAtual);
        if (respostaAtual.ok) {
            const dadosAtual = await respostaAtual.json();
            const temp = Math.round(dadosAtual.main.temp);
            const desc = dadosAtual.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${dadosAtual.weather[0].icon}@2x.png`;
            
            mLocalizacao.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                    <img src="${icon}" alt="${desc}" width="80" height="80">
                    <div style="text-align: left;">
                        <p style="font-size: 2rem; margin: 0; color: var(--cor-primaria);"><strong>${temp}°C</strong></p>
                        <p style="margin: 0; text-transform: capitalize; color: #555;">${desc}</p>
                    </div>
                </div>
            `;
        }

        const respostaPrev = await fetch(urlPrevisao);
        if (respostaPrev.ok) {
            const dadosPrev = await respostaPrev.json();
            
            const diasPrevisao = [dadosPrev.list[8], dadosPrev.list[16], dadosPrev.list[24]];
            
            mListaPrevisao.innerHTML = ''; 
            
            diasPrevisao.forEach(dia => {
                const dataObj = new Date(dia.dt_txt);
                const diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
                const li = document.createElement('li');
                li.innerHTML = `<strong>${diaSemana}:</strong> ${Math.round(dia.main.temp)}°C`;
                mListaPrevisao.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
    }
}
carregarClima();


async function carregarDestaques() {
    const divDestaques = document.querySelector('#empresas-destaque');
    
    try {
        const resposta = await fetch('dados/membros.json');
        const membros = await resposta.json();
        
        const membrosElegiveis = membros.filter(m => m.nivel_associacao >= 2);
        
        const embaralhados = membrosElegiveis.sort(() => 0.5 - Math.random());
        
        const selecionados = embaralhados.slice(0, 3);
        
        divDestaques.innerHTML = '';
        
        selecionados.forEach(membro => {
            let nivelTexto = membro.nivel_associacao === 3 ? 'Ouro' : 'Prata';
            let cartao = document.createElement('div');
            cartao.classList.add('cartao-destaque');
            cartao.innerHTML = `
                <img src="imagens/${membro.imagem}" alt="Logo ${membro.nome}" loading="lazy">
                <h4>${membro.nome}</h4>
                <p><strong>Nível:</strong> ${nivelTexto}</p>
                <p>📞 ${membro.telefone}</p>
                <p>📍 ${membro.endereco}</p>
                <a href="${membro.website}" target="_blank">Visitar Site</a>
            `;
            divDestaques.appendChild(cartao);
        });
    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);
    }
}
carregarDestaques();