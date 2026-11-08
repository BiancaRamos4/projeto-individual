// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

// páginas da raiz (formulario.html e dashboard.html): só entra quem está logado
function exigirLogin() {
    if (sessionStorage.ID_USUARIO == null) {
        window.location = "login.html";
    }
}

// mostra ou esconde os links da navbar conforme o login
function ajustarNavbar() {
    var logado = sessionStorage.ID_USUARIO != null;
    document.querySelectorAll(".so-logado").forEach(function (el) {
        el.style.display = logado ? "" : "none";
    });
    document.querySelectorAll(".so-deslogado").forEach(function (el) {
        el.style.display = logado ? "none" : "";
    });
}