const btnAbrir = document.querySelector("#btnAbrir");
const caixaDialogo = document.querySelector("#caixaDialogo");
const btnFechar = document.querySelector("#btnFechar");

// Verifica se os elementos realmente existem na página antes de adicionar os eventos
if (btnAbrir && caixaDialogo && btnFechar) {
    btnAbrir.addEventListener("click", () => {
        caixaDialogo.showModal();
    });

    btnFechar.addEventListener("click", () => {
        caixaDialogo.close();
    });
} else {
    console.log("Os botões do modal não foram encontrados nesta página.");
}