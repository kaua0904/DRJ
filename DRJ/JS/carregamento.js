function criarTelaCarregamento() {
    let tela = document.querySelector(".tela-carregamento");

    if (tela) {
        return tela;
    }

    tela = document.createElement("div");
    tela.className = "tela-carregamento";
    tela.innerHTML = `
        <div class="caixa-carregamento" role="status" aria-live="polite">
            <div class="palco-carregamento">
                <img class="imagem-carregamento" src="imagens/carregamento-drj.png" alt="DRJ Bar e Lanchonete">
                <span class="sombra-carregamento" aria-hidden="true"></span>
            </div>
            <p class="texto-carregamento">Carregando...</p>
        </div>
    `;

    document.body.appendChild(tela);
    return tela;
}

function mostrarCarregamento(texto) {
    const tela = criarTelaCarregamento();
    const textoCarregamento = tela.querySelector(".texto-carregamento");

    textoCarregamento.textContent = texto || "Carregando...";
    tela.classList.add("ativa");
}

function esconderCarregamento() {
    const tela = document.querySelector(".tela-carregamento");

    if (tela) {
        tela.classList.remove("ativa");
    }
}

function irComCarregamento(destino, texto, tempo) {
    mostrarCarregamento(texto);

    setTimeout(function () {
        window.location.href = destino;
    }, tempo || 900);
}

mostrarCarregamento("Carregando o DRJ...");

window.addEventListener("load", function () {
    setTimeout(esconderCarregamento, 500);
});

document.addEventListener("click", function (event) {
    const link = event.target.closest("a");

    if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
    }

    const destino = link.getAttribute("href");

    if (!destino || destino.startsWith("#") || destino.startsWith("mailto:") || destino.startsWith("tel:")) {
        return;
    }

    event.preventDefault();
    irComCarregamento(destino, "Abrindo...", 700);
});
