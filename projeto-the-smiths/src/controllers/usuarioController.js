var usuarioModel = require("../models/usuarioModel");

// login: confere e-mail e senha
function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length == 1) {
                // achou o usuário: devolve só o que a página precisa
                res.json({
                    id: resultado[0].id,
                    nome: resultado[0].nome,
                    email: resultado[0].email
                });
            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao realizar o login.");
        });
}

// cadastro: grava o usuário novo
function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    usuarioModel.cadastrar(nome, email, senha)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            if (erro.code == "ER_DUP_ENTRY") {
                res.status(409).send("Este e-mail já está cadastrado.");
            } else {
                res.status(500).send("Erro ao cadastrar.");
            }
        });
}

module.exports = { autenticar, cadastrar };
