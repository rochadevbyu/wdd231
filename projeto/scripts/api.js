export async function buscarSolucoes() {
    try {
        const resposta = await fetch('dados/solucoes.json');
        if (!resposta.ok) throw new Error('Erro ao buscar o arquivo JSON');
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Falha na API:', erro);
        return []; 
    }
}