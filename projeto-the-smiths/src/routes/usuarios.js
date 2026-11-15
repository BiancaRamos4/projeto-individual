

// traz o Express e cria o agrupador de rotas (app.js encaixa no prefixo /usuarios)
var express = require("express");
var router = express.Router();


// traz o controller de usuário (o texto precisa ser igual ao nome do arquivo)
var usuarioController = require("../controllers/usuarioController");


// POST /usuarios/cadastrar: recebe os dados do cadastro.html e passa para a função cadastrar do controller
// é POST porque envia nome, e-mail e senha (dados que não devem aparecer na URL)
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})



// POST /usuarios/autenticar: recebe e-mail e senha do login.html e passa para a função autenticar do controller
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});



// "empresta" estas rotas para o app.js
module.exports = router;