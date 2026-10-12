import { buscarSolucoes } from './api.js';

async function renderizarSolucoes() {
    const container = document.getElementById('recursos-container');
    if (!container) return;

    const solucoesData = await buscarSolucoes();
    
    container.innerHTML = solucoesData.map(item => `
        <div class="card">
            <img src="${item.imagem}" alt="${item.titulo}" loading="lazy" class="img-solucao">
            <h3 class="solucao-titulo">${item.titulo}</h3>
            <p class="solucao-texto">${item.descricao}</p>
            <button class="btn btn-modal margem-top" data-titulo="${item.titulo}" data-desc="${item.detalhes}">Ver Detalhes</button>
        </div>
    `).join('');
}

async function renderizarDestaques() {
    const container = document.getElementById('destaques-container');
    if (!container) return; 

    const solucoesData = await buscarSolucoes();
    const dadosEmbaralhados = solucoesData.sort(() => 0.5 - Math.random());
    const destaquesSelecionados = dadosEmbaralhados.slice(0, 3);
    
    container.innerHTML = destaquesSelecionados.map(item => `
        <div class="card">
            <img src="${item.imagem}" alt="${item.titulo}" loading="lazy" class="img-solucao">
            <h3 class="solucao-titulo">${item.titulo}</h3>
            <p class="solucao-texto">${item.descricao}</p>
            <a href="solucoes.html" class="btn margem-top" style="width: 100%; text-align: center; display: block; box-sizing: border-box;">Conhecer Soluções</a>
        </div>
    `).join('');
}

async function configurarAPI_IBGE() {
    const selectUF = document.getElementById('uf');
    const selectMunicipio = document.getElementById('municipio');

    if (selectUF && selectMunicipio) {
        try {
            const respostaUF = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            const dadosUF = await respostaUF.json();

            selectUF.innerHTML = '<option value="">Selecione o Estado...</option>';
            dadosUF.forEach(estado => {
                selectUF.innerHTML += `<option value="${estado.sigla}">${estado.nome}</option>`;
            });

            selectUF.addEventListener('change', async function() {
                const ufSelecionada = this.value;
                selectMunicipio.innerHTML = '<option value="">Carregando...</option>';
                selectMunicipio.disabled = true;

                if (ufSelecionada) {
                    const respostaMunicipios = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios`);
                    const dadosMunicipios = await respostaMunicipios.json();
                    
                    selectMunicipio.innerHTML = '<option value="">Selecione o Município...</option>';
                    dadosMunicipios.forEach(municipio => {
                        selectMunicipio.innerHTML += `<option value="${municipio.nome}">${municipio.nome}</option>`;
                    });
                    selectMunicipio.disabled = false;
                } else {
                    selectMunicipio.innerHTML = '<option value="">Selecione primeiro o Estado...</option>';
                }
            });
        } catch (erro) {
            console.error('Erro ao conectar com a API do IBGE:', erro);
            selectUF.innerHTML = '<option value="">Erro ao carregar dados.</option>';
        }
    }
}

function configurarModal() {
    const modal = document.getElementById('modal-solucao');
    const btnFechar = document.getElementById('fechar-modal');

    if (modal) {
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-modal')) {
                document.getElementById('modal-titulo').innerText = e.target.getAttribute('data-titulo');
                document.getElementById('modal-desc').innerText = e.target.getAttribute('data-desc');
                modal.showModal();
            }
        });

        btnFechar.addEventListener('click', () => {
            modal.close();
        });
    }
}

function configurarMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const navUl = document.querySelector('nav ul');

    if (menuBtn && navUl) {
        menuBtn.addEventListener('click', () => {
            navUl.classList.toggle('aberto');
            menuBtn.innerHTML = navUl.classList.contains('aberto') ? '✖' : '☰';
        });
    }
}

function atualizarRodape() {
    const spanAno = document.getElementById('anoatual');
    const spanUltimaModificacao = document.getElementById('ultimaModificacao');
    if (spanAno && spanUltimaModificacao) {
        spanAno.innerHTML = `${new Date().getFullYear()}`;
        spanUltimaModificacao.innerHTML = `Última modificação: ${new Date(document.lastModified).toLocaleDateString('pt-BR')}`;
    }
}

function registrarVisita() {
    const displayVisitas = document.getElementById('mensagem-visita');
    if (displayVisitas) {
        let visitas = Number(window.localStorage.getItem('sginf_visitas')) || 0;
        visitas++;
        localStorage.setItem('sginf_visitas', visitas);
        if (visitas === 1) {
            displayVisitas.innerText = "Bem-vindo(a) à sua primeira visita ao nosso portal!";
        } else {
            displayVisitas.innerText = `Bem-vindo(a) de volta! Esta é a sua visita de número ${visitas}.`;
        }
    }
}

function configurarFormulario() {
    const form = document.getElementById('formulario-contato');
    if (form) {
        form.addEventListener('submit', () => {
            const nome = document.getElementById('nome').value;
            const orgao = document.getElementById('orgao').value;
            localStorage.setItem('sginf_lead_nome', nome);
            localStorage.setItem('sginf_lead_orgao', orgao);
        });

        const radiosPerfil = document.getElementsByName('perfil');
        radiosPerfil.forEach(radio => {
            radio.addEventListener('change', function() {
                document.querySelectorAll('.bloco-condicional').forEach(b => b.style.display = 'none');
                const bloco = document.getElementById(`${this.value}-perfil`);
                if (bloco) bloco.style.display = 'block';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    configurarMenu();
    renderizarSolucoes();
    renderizarDestaques();
    configurarModal();
    configurarAPI_IBGE();
    configurarFormulario();
    registrarVisita();
    atualizarRodape();
});