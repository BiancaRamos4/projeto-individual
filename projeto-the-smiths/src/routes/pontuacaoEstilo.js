// ===== ROTA DE PONTUAÇÃO =====
// A rota é o "garçom": olha o endereço do pedido e entrega para a função certa do controller.
// Ela não valida nada e não mexe no banco. Só liga "método + endereço" a uma função.

// traz a biblioteca Express (é ela que cria o servidor e as rotas)
var express = require("express");

// cria um "agrupador de rotas" só para o assunto pontuação
// o app.js encaixa este agrupador no prefixo /pontuacoes
var router = express.Router();

// traz o controller de pontuação
// "../" sobe uma pasta (de routes para src) e depois entra em controllers
// o texto precisa ser IGUAL ao nome do arquivo (pontuacaoController.js)
var pontuacaoEstiloController = require("../controllers/pontuacaoEstiloController");

// ROTA 1: salvar
// método POST (usado para ENVIAR dados) no caminho /salvar
// com o prefixo do app.js, o endereço completo é: POST /pontuacoes/salvar
// agora ela grava os pontos dos ÁLBUNS e também os pontos dos ESTILOS (os dois vêm no mesmo pedido)
router.post("/salvar", function (req, res) {
    // req = o pedido que chegou | res = a resposta que será devolvida
    // a rota apenas repassa os dois para a função salvar do controller
    pontuacaoEstiloController.salvar(req, res);
});

// ROTA 2: listar (pontos dos álbuns)
// método GET (usado para CONSULTAR) no caminho /listar/ seguido de um valor
// ":idUsuario" é um parâmetro: em /pontuacoes/listar/7, o valor "7" chega ao controller em req.params.idUsuario
router.get("/listar/:idUsuario", function (req, res) {
    pontuacaoEstiloController.listar(req, res);
});

// ROTA 3 (NOVA): estilos (pontos dos estilos de música, para o gráfico de radar)
// endereço completo: GET /pontuacoes/estilos/7
router.get("/estilos/:idUsuario", function (req, res) {
    pontuacaoEstiloController.listarEstilos(req, res);
});

// "empresta" estas rotas para o app.js (é isto que o require do app.js recebe)
module.exports = router;
