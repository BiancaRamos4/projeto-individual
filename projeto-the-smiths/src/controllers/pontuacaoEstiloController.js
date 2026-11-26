// ===== CONTROLLER DE PONTUAÇÃO =====
// O controller é o "gerente": pega os dados do pedido, chama o model e decide a resposta.
// Ele não escreve SQL (isso é do model) e não define endereços (isso é da rota).

// traz o model de pontuação, que é quem conversa com o banco
// o texto precisa ser IGUAL ao nome do arquivo (pontuacaoModel.js)
var pontuacaoEstiloModel = require("../models/pontuacaoEstiloModel");

// ---------- FUNÇÃO SALVAR (ALTERADA) ----------
// chamada pela rota POST /pontuacoes/salvar, quando a pessoa termina o formulário
// agora ela grava duas coisas: os pontos dos álbuns e os pontos dos estilos
function salvar(req, res) {
    // lê os dados que a página enviou no corpo do pedido (req.body)
    // os nomes (idUsuarioServer, pontuacoesServer e estilosServer) precisam ser IGUAIS aos do fetch do formulario.html
    // o req.body só existe porque o app.js tem app.use(express.json())
    var idUsuario = req.body.idUsuarioServer;      // id de quem respondeu (ex.: "7")
    var pontuacoes = req.body.pontuacoesServer;    // pontos dos ÁLBUNS: [{ idAlbum: 1, pontos: 21 }, ...]
    var estilos = req.body.estilosServer;          // pontos dos ESTILOS: [{ idEstilo: 1, pontos: 9 }, ...] (campo novo)

    // 1º passo: grava os pontos dos álbuns (o model devolve uma PROMESSA)
    pontuacaoEstiloModel.salvar(idUsuario, pontuacoes)
        .then(function (resultado) {
            // 2º passo: só quando os álbuns terminaram de gravar, grava os estilos
            // o "return" entrega a promessa do model para o PRÓXIMO .then, que espera ela terminar
            return pontuacaoEstiloModel.salvarEstilos(idUsuario, estilos);
        })
        .then(function (resultado) {
            // 3º passo: os dois deram certo
            // status 200 = deu certo | .json(...) envia o resultado em formato JSON e encerra a resposta
            res.status(200).json(resultado);
        })
        // um único .catch cobre os dois passos: se qualquer um falhar, cai aqui
        // (sem o .catch, um erro no banco derrubaria o servidor inteiro)
        .catch(function (erro) {
            // escreve o erro no terminal, para você ver o que aconteceu
            console.log(erro);
            // status 500 = erro no servidor | erro.sqlMessage = a mensagem do MySQL
            res.status(500).json(erro.sqlMessage);
        });
}

// ---------- FUNÇÃO LISTAR (igual à anterior) ----------
// chamada pela rota GET /pontuacoes/listar/ID, quando a dashboard abre (ou quando o login decide para onde ir)
function listar(req, res) {
    // aqui o id vem da URL (req.params), e não do corpo, porque o pedido é um GET
    // o nome "idUsuario" vem do ":idUsuario" que escrevemos na rota
    var idUsuario = req.params.idUsuario;

    // chama o model e espera a promessa
    pontuacaoEstiloModel.listar(idUsuario)
        .then(function (resultado) {
            // resultado = lista de linhas que o banco devolveu | .length = quantas linhas
            if (resultado.length > 0) {
                // tem pontuação: responde 200 com a lista
                res.status(200).json(resultado);
            } else {
                // não tem nenhuma linha: a pessoa ainda não respondeu o formulário
                // 204 = "deu certo, mas não há conteúdo" (o login usa isso para decidir entre formulário e dashboard)
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            // mesmo tratamento do salvar: mostra no terminal e responde 500
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// ---------- FUNÇÃO LISTAR ESTILOS (NOVA) ----------
// chamada pela rota GET /pontuacoes/estilos/ID, quando a dashboard monta o gráfico de radar
function listarEstilos(req, res) {
    // o id vem da URL, como no listar
    var idUsuario = req.params.idUsuario;

    pontuacaoEstiloModel.listarEstilos(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // tem estilos guardados: responde 200 com a lista
                res.status(200).json(resultado);
            } else {
                // 204 = sem conteúdo: quem respondeu o formulário ANTES desta novidade não tem estilos guardados
                // (a dashboard usa isso para pedir que a pessoa refaça o formulário)
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// "empresta" as funções para a rota (por isso a rota escreve pontuacaoController.salvar, .listar e .listarEstilos)
// { salvar, listar } é a forma curta de escrever { salvar: salvar, listar: listar }
module.exports = { salvar, listar, listarEstilos };
