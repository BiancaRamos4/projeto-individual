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
    // "logado" começa como falso e vira verdadeiro se existir o ID_USUARIO na sessão
    let logado = false;
    if (sessionStorage.ID_USUARIO != null) {
        logado = true;
    }

    // todos os itens da navbar marcados com cada etiqueta (class)
    let linksLogado = document.getElementsByClassName("so-logado");
    let linksDeslogado = document.getElementsByClassName("so-deslogado");

    // itens "so-logado" (Formulário, Dashboard, Sair): aparecem só para quem fez login
    for (let i = 0; i < linksLogado.length; i++) {
        if (logado) {
            linksLogado[i].style.display = "";       // "" = volta ao normal (aparece)
        } else {
            linksLogado[i].style.display = "none";   // "none" = some
        }
    }

    // itens "so-deslogado" (Login, Cadastro e as barras |): aparecem só para quem NÃO fez login
    for (let i = 0; i < linksDeslogado.length; i++) {
        if (logado) {
            linksDeslogado[i].style.display = "none";
        } else {
            linksDeslogado[i].style.display = "";
        }
    }
}
