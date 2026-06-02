const usuarioLogado = localStorage.getItem("usuarioLogado") === "true";

if (!usuarioLogado) {
    irComCarregamento("Login.html", "Abrindo login...", 900);
}

const nomeUsuario = localStorage.getItem("usuarioNome");
const emailUsuario = localStorage.getItem("usuarioEmail");
const fotoUsuario = localStorage.getItem("usuarioFoto");
const imagemLogin = document.querySelector(".img-login");
const botaoLogin = document.querySelector(".botao-login");
const saudacaoUsuario = document.querySelector(".saudacao-usuario");
const avisoSite = document.querySelector(".aviso-site");
const localizacaoSalva = localStorage.getItem("localizacaoSalva") === "true";
const localizacoesSalvas = JSON.parse(localStorage.getItem("localizacoes") || "[]");
const dadosLocalizacao = JSON.parse(localStorage.getItem("dadosLocalizacao") || "null");
const botaoMaps = document.querySelector(".botao-maps");

if (usuarioLogado && imagemLogin) {
    imagemLogin.src = fotoUsuario || "imagens/login_feito.png";
    imagemLogin.alt = "Perfil do usuario";
}

if (usuarioLogado && emailUsuario && botaoLogin) {
    botaoLogin.setAttribute("aria-label", "Perfil do usuario: " + emailUsuario);
    botaoLogin.title = emailUsuario;
}

if (usuarioLogado && saudacaoUsuario) {
    saudacaoUsuario.textContent = "Ola, " + (nomeUsuario || "usuario") + "!";
}

if (avisoSite) {
    setTimeout(function () {
        avisoSite.classList.add("aviso-sumindo");
    }, 3500);

    setTimeout(function () {
        avisoSite.remove();
    }, 4300);
}

if ((localizacoesSalvas.length > 0 || localizacaoSalva) && botaoMaps) {
    const primeiraLocalizacao = localizacoesSalvas[0] || dadosLocalizacao;
    const enderecoSalvo = primeiraLocalizacao ? [
        primeiraLocalizacao.rua,
        primeiraLocalizacao.numero,
        primeiraLocalizacao.bairro,
        primeiraLocalizacao.cidade,
        primeiraLocalizacao.estado
    ].filter(Boolean).join(", ") : "";
    const totalLocalizacoes = localizacoesSalvas.length || 1;

    botaoMaps.classList.add("localizacao-salva");
    botaoMaps.setAttribute("aria-label", totalLocalizacoes + " localizacao(oes) salva(s)");
    botaoMaps.title = totalLocalizacoes + " localizacao(oes) salva(s)" + (enderecoSalvo ? ": " + enderecoSalvo : "");
}
