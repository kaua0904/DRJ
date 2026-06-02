const formLogin = document.querySelector(".form-login");
const botaoLogin = formLogin.querySelector("button");
const painelLogin = document.querySelector(".painel-login");
const painelUsuario = document.querySelector(".painel-usuario");
const nomeUsuario = document.querySelector(".usuario-nome");
const emailUsuario = document.querySelector(".usuario-email");
const inputFoto = document.querySelector("#fotoPerfil");
const previewFoto = document.querySelector(".preview-foto");
const botaoSair = document.querySelector(".botao-sair");

function mostrarPerfil() {
    const nome = localStorage.getItem("usuarioNome") || "Usuario DRJ";
    const email = localStorage.getItem("usuarioEmail") || "E-mail nao informado";
    const foto = localStorage.getItem("usuarioFoto");

    nomeUsuario.textContent = nome;
    emailUsuario.textContent = email;

    if (foto) {
        previewFoto.src = foto;
    } else {
        previewFoto.src = "imagens/login_feito.png";
    }

    painelLogin.hidden = true;
    painelUsuario.hidden = false;
}

function mostrarLogin() {
    painelLogin.hidden = false;
    painelUsuario.hidden = true;
}

if (localStorage.getItem("usuarioLogado") === "true") {
    mostrarPerfil();
} else {
    mostrarLogin();
}

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();

    localStorage.setItem("usuarioLogado", "true");
    localStorage.setItem("usuarioNome", nome);
    localStorage.setItem("usuarioEmail", email);

    botaoLogin.textContent = "Login efetuado! Aproveite o site.";
    botaoLogin.classList.add("login-concluido");
    mostrarPerfil();

    irComCarregamento("Tela Principal.html", "Preparando sua tela...", 1300);
});

inputFoto.addEventListener("change", function () {
    const arquivo = inputFoto.files[0];

    if (!arquivo) {
        return;
    }

    const leitor = new FileReader();

    leitor.addEventListener("load", function () {
        localStorage.setItem("usuarioFoto", leitor.result);
        previewFoto.src = leitor.result;
    });

    leitor.readAsDataURL(arquivo);
});

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioFoto");
    irComCarregamento("Login.html", "Saindo da conta...", 900);
});
