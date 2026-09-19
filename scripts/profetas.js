const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  console.table(dados.profetas); // Descomente para testar no console
  exibirProfetas(dados.profetas);
}



const exibirProfetas = (profetas) => {
  profetas.forEach((profeta) => {  
    // 1. Cria elementos para adicionar ao elemento div.cartoes
    let cartao = document.createElement('section');
    let nomeCompleto = document.createElement('h2'); // Preenchido: h2
    let dataNascimento = document.createElement('p'); // Elemento extra para a data
    let localNascimento = document.createElement('p'); // Elemento extra para o local
    let retrato = document.createElement('img');

    // 2. Cria o conteúdo de texto para mostrar as informações
    nomeCompleto.textContent = `${profeta.name} ${profeta.lastname}`; // Trocado para name e lastname
    dataNascimento.textContent = `Data de Nascimento: ${profeta.birthdate}`; // Trocado para birthdate
    localNascimento.textContent = `Local de Nascimento: ${profeta.birthplace}`; // Trocado para birthplace

    // 3. Cria o retrato definindo todos os atributos relevantes
    retrato.setAttribute('src', profeta.imageurl); // Trocado para imageurl
    retrato.setAttribute('alt', `Retrato de ${profeta.name} ${profeta.lastname}`); // Trocado para name e lastname    
    retrato.setAttribute('loading', 'lazy');
    retrato.setAttribute('width', '340');
    retrato.setAttribute('height', '440');

    // 4. Acrescenta (append) os elementos criados à seção (cartao)
    cartao.appendChild(nomeCompleto); // Preenchido
    cartao.appendChild(dataNascimento);
    cartao.appendChild(localNascimento);
    cartao.appendChild(retrato);

    // 5. Adiciona o cartão pronto à div principal
    cartoes.appendChild(cartao);
  });
}

obterDadosDeProfetas();