var pontuacaoModel = require("../models/pontuacaoModel");

function salvar(req, res) {
    var idUsuario = Number(req.body.idUsuarioServer);
    var pontuacoes = req.body.pontuacoesServer;

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).send("O idUsuario está inválido!");
    }
    if (!Array.isArray(pontuacoes) || pontuacoes.length === 0) {
        return res.status(400).send("As pontuações estão inválidas!");
    }
    for (var i = 0; i < pontuacoes.length; i++) {
        if (!Number.isInteger(Number(pontuacoes[i].idAlbum)) || !Number.isInteger(Number(pontuacoes[i].pontos))) {
            return res.status(400).send("Os dados das pontuações estão inválidos!");
        }
    }

    pontuacaoModel.salvar(idUsuario, pontuacoes)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao salvar as pontuações! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).send("O idUsuario está inválido!");
    }

    pontuacaoModel.listar(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                // 204 = usuário ainda não respondeu o formulário
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao buscar as pontuações! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvar,
    listar
};