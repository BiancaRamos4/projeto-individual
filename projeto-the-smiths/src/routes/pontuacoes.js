
// traz a biblioteca Express (é ela que cria o servidor e as rotas)
var express = require("express");
var router = express.Router();

// traz o controller de pontuação
// o texto precisa ser IGUAL ao nome do arquivo (pontuacaoController.js)
var pontuacaoController = require("../controllers/pontuacaoController");
 

// método POST (usado para ENVIAR dados) no caminho /salvar
// com o prefixo do app.js, o endereço completo é: POST /pontuacoes/salvar
router.post("/salvar", function (req, res) {
    pontuacaoController.salvar(req, res);     // req = o pedido que chegou, res = a resposta que será devolvida
});
 

// método GET (usado para CONSULTAR) no caminho /listar/ seguido de um valor
// ":idUsuario" é um parâmetro: em /pontuacoes/listar/7, o valor "7" chega ao controller em req.params.idUsuario
router.get("/listar/:idUsuario", function (req, res) {
    pontuacaoController.listar(req, res);
});
 

// "empresta" estas rotas para o app.js (é isto que o require do app.js recebe)
module.exports = router;
 