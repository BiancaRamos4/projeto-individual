var pontuacaoModel = require("../models/pontuacaoModel");

// recebe os pontos do formulário e manda o model gravar no banco
function salvar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var pontuacoes = req.body.pontuacoesServer;

    pontuacaoModel.salvar(idUsuario, pontuacoes)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// devolve os pontos do usuário (ou 204 se ele ainda não respondeu o formulário)
function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    pontuacaoModel.listar(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { salvar, listar };
