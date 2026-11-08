var express = require("express");
var router = express.Router();
 
var pontuacaoController = require("../controllers/pontuacaoController");
 
router.post("/salvar", function (req, res) {
    pontuacaoController.salvar(req, res);
});
 
router.get("/listar/:idUsuario", function (req, res) {
    pontuacaoController.listar(req, res);
});
 
module.exports = router;
 