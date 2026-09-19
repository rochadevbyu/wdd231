const blocoEmpresas = document.querySelector('#cartoes'); 
const btnGrade = document.querySelector('#btn-grade');
const btnLista = document.querySelector('#btn-lista');

const exibirMembros = (membros) => {
    blocoEmpresas.innerHTML = '';

    membros.forEach((membro) => {
        let cartao = document.createElement('section');
        let nome = document.createElement('h3');
        let endereco = document.createElement('p');
        let telefone = document.createElement('p');   
        let nivel = document.createElement('p');       
        let imagem = document.createElement('img');
        let site = document.createElement('a');

        nome.textContent = membro.nome;
        endereco.textContent = membro.endereco;
        telefone.textContent = membro.telefone;
        
        
        let textoNivel = "";
        if (membro.nivel_associacao === 1) {
            textoNivel = "Membro Padrão";
        } else if (membro.nivel_associacao === 2) {
            textoNivel = "Membro Prata";
        } else if (membro.nivel_associacao === 3) {
            textoNivel = "Membro Ouro";
        }
       
        nivel.innerHTML = `<strong>Nível:</strong> ${textoNivel}`;

        site.setAttribute('href', membro.website);
        site.textContent = "Visitar Website";
        site.setAttribute('target', '_blank'); 

        imagem.setAttribute('src', `imagens/${membro.imagem}`);
        imagem.setAttribute('alt', `Logo da empresa ${membro.nome}`);
        imagem.setAttribute('loading', 'lazy'); 
        imagem.setAttribute('width', '150'); 
        imagem.setAttribute('height', 'auto');

        cartao.appendChild(imagem);
        cartao.appendChild(nome);
        cartao.appendChild(endereco);
        cartao.appendChild(telefone);
        cartao.appendChild(nivel); 
        cartao.appendChild(site);

        blocoEmpresas.appendChild(cartao);
    });
}

async function getMembros() {
    try {
        const resposta = await fetch('dados/membros.json');
        const dados = await resposta.json();
        exibirMembros(dados);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

btnGrade.addEventListener('click', () => {
    blocoEmpresas.classList.remove('list');
});

btnLista.addEventListener('click', () => {
    blocoEmpresas.classList.add('list');
});

getMembros();