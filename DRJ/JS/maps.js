const formLocalizacao = document.querySelector(".form-localizacao");
const botaoSalvarLocalizacao = document.querySelector(".botao-salvar-localizacao");
const botaoNovaLocalizacao = document.querySelector(".botao-nova-localizacao");
const botaoRemoverLocalizacao = document.querySelector(".botao-remover-localizacao");
const listaLocalizacoes = document.querySelector(".lista-localizacoes");
const indiceLocalizacao = document.querySelector("#indiceLocalizacao");
const emailUsuario = localStorage.getItem("usuarioEmail");
const fotoUsuario = localStorage.getItem("usuarioFoto");
const botaoLogin = document.querySelector(".botao-login");
const imagemLogin = document.querySelector(".img-login");

const camposLocalizacao = [
    "cep",
    "estado",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "complemento",
    "endereco",
    "referencia"
];

if (localStorage.getItem("usuarioLogado") !== "true") {
    irComCarregamento("Login.html", "Abrindo login...", 900);
}

if (imagemLogin) {
    imagemLogin.src = fotoUsuario || "imagens/login_feito.png";
    imagemLogin.alt = "Perfil do usuario";
}

if (emailUsuario && botaoLogin) {
    botaoLogin.setAttribute("aria-label", "Perfil do usuario: " + emailUsuario);
    botaoLogin.title = emailUsuario;
}

function carregarLocalizacoes() {
    const localizacoes = JSON.parse(localStorage.getItem("localizacoes") || "[]");
    const localizacaoAntiga = JSON.parse(localStorage.getItem("dadosLocalizacao") || "null");

    if (localizacoes.length === 0 && localizacaoAntiga) {
        localizacoes.push(localizacaoAntiga);
        localStorage.setItem("localizacoes", JSON.stringify(localizacoes));
    }

    return localizacoes;
}

function salvarLocalizacoes(localizacoes) {
    localStorage.setItem("localizacoes", JSON.stringify(localizacoes));
    localStorage.setItem("localizacaoSalva", localizacoes.length > 0 ? "true" : "false");

    if (localizacoes.length > 0) {
        localStorage.setItem("dadosLocalizacao", JSON.stringify(localizacoes[0]));
    } else {
        localStorage.removeItem("dadosLocalizacao");
    }
}

function montarResumo(localizacao) {
    return [
        localizacao.rua,
        localizacao.numero,
        localizacao.bairro,
        localizacao.cidade,
        localizacao.estado
    ].filter(Boolean).join(", ") || "Localizacao sem endereco";
}

function preencherFormulario(localizacao, indice) {
    camposLocalizacao.forEach(function (campo) {
        const elemento = document.querySelector("#" + campo);

        if (elemento) {
            elemento.value = localizacao ? localizacao[campo] || "" : "";
        }
    });

    indiceLocalizacao.value = Number.isInteger(indice) ? String(indice) : "";
    botaoSalvarLocalizacao.textContent = Number.isInteger(indice) ? "Atualizar localizacao" : "Salvar nova localizacao";
    botaoSalvarLocalizacao.classList.remove("localizacao-concluida");
}

function renderizarLista() {
    const localizacoes = carregarLocalizacoes();
    const indiceSelecionado = indiceLocalizacao.value === "" ? -1 : Number(indiceLocalizacao.value);

    listaLocalizacoes.innerHTML = "";

    if (localizacoes.length === 0) {
        listaLocalizacoes.innerHTML = '<p class="mensagem-lista">Nenhuma localizacao salva ainda.</p>';
        botaoRemoverLocalizacao.disabled = true;
        return;
    }

    botaoRemoverLocalizacao.disabled = indiceSelecionado < 0;

    localizacoes.forEach(function (localizacao, indice) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "item-localizacao";

        if (indice === indiceSelecionado) {
            botao.classList.add("ativo");
        }

        botao.innerHTML = `
            <strong>Localizacao ${indice + 1}</strong>
            <span>${montarResumo(localizacao)}</span>
        `;

        botao.addEventListener("click", function () {
            preencherFormulario(localizacao, indice);
            renderizarLista();
        });

        listaLocalizacoes.appendChild(botao);
    });
}

function obterDadosFormulario() {
    return {
        cep: document.querySelector("#cep").value.trim(),
        estado: document.querySelector("#estado").value,
        rua: document.querySelector("#rua").value.trim(),
        numero: document.querySelector("#numero").value.trim(),
        bairro: document.querySelector("#bairro").value.trim(),
        cidade: document.querySelector("#cidade").value.trim(),
        complemento: document.querySelector("#complemento").value.trim(),
        endereco: document.querySelector("#endereco").value.trim(),
        referencia: document.querySelector("#referencia").value.trim()
    };
}

botaoNovaLocalizacao.addEventListener("click", function () {
    preencherFormulario(null, null);
    renderizarLista();
    document.querySelector("#cep").focus();
});

botaoRemoverLocalizacao.addEventListener("click", function () {
    const indice = indiceLocalizacao.value === "" ? -1 : Number(indiceLocalizacao.value);

    if (indice < 0) {
        return;
    }

    const localizacoes = carregarLocalizacoes();
    localizacoes.splice(indice, 1);
    salvarLocalizacoes(localizacoes);
    preencherFormulario(localizacoes[0] || null, localizacoes.length > 0 ? 0 : null);
    renderizarLista();
});

formLocalizacao.addEventListener("submit", function (event) {
    event.preventDefault();

    const localizacoes = carregarLocalizacoes();
    const indice = indiceLocalizacao.value === "" ? -1 : Number(indiceLocalizacao.value);
    const dadosLocalizacao = obterDadosFormulario();

    if (indice >= 0) {
        localizacoes[indice] = dadosLocalizacao;
    } else {
        localizacoes.push(dadosLocalizacao);
        indiceLocalizacao.value = String(localizacoes.length - 1);
    }

    salvarLocalizacoes(localizacoes);
    botaoSalvarLocalizacao.textContent = "Localizacao salva!";
    botaoSalvarLocalizacao.classList.add("localizacao-concluida");
    renderizarLista();
});

const localizacoesIniciais = carregarLocalizacoes();
preencherFormulario(localizacoesIniciais[0] || null, localizacoesIniciais.length > 0 ? 0 : null);
renderizarLista();
