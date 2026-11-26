// ===== MODEL DE PONTUAÇÃO =====
// O model é o "estoque": só monta o SQL e pede ao config.js para executar no banco.
// Ele não conhece req nem res (não responde ao navegador).

// traz o config.js, que sabe se conectar ao MySQL
// (a função database.executar(sql) executa um SQL e devolve uma promessa)
var database = require("../database/config");

// ---------- FUNÇÃO SALVAR (igual à anterior) ----------
// grava os pontos dos álbuns do usuário (se ele já tinha respondido, atualiza)
// idUsuario = quem respondeu | pontuacoes = lista [{ idAlbum: 1, pontos: 21 }, ...]
function salvar(idUsuario, pontuacoes) {
    // vai montar o texto das linhas do INSERT, uma para cada álbum
    // exemplo do resultado final: (7, 1, 21), (7, 2, 6), (7, 3, 13), (7, 4, 8)
    var linhas = "";

    // percorre a lista de álbuns: i vale 0, 1, 2, 3
    for (var i = 0; i < pontuacoes.length; i++) {
        // entre uma linha e outra precisa de vírgula (menos antes da primeira)
        if (i > 0) {
            linhas = linhas + ", ";
        }
        // junta: "(" + id do usuário + ", " + id do álbum + ", " + pontos + ")"
        // Number(...) garante que só números entram no SQL (isso protege o banco)
        linhas = linhas + "(" + Number(idUsuario) + ", "
                 + Number(pontuacoes[i].idAlbum) + ", "
                 + Number(pontuacoes[i].pontos) + ")";
    }

    // o comando SQL. As crases permitem escrever em várias linhas e usar ${ } para colocar valores
    // INSERT INTO pontuacao (...): insere linhas nesta tabela, nestas colunas
    // VALUES ${linhas}: as linhas montadas acima, de uma vez só
    // ON DUPLICATE KEY UPDATE: se já existe uma linha com a mesma chave (usuário + álbum),
    //   em vez de dar erro ele ATUALIZA os pontos e a data. É isso que faz o "Refazer formulário" funcionar
    // NOW() = a data e hora atuais
    var instrucaoSql = `
        INSERT INTO pontuacao (fkUsuario, fkAlbum, pontos)
        VALUES ${linhas}
        ON DUPLICATE KEY UPDATE pontos = VALUES(pontos), dtResposta = NOW();
    `;

    // manda o SQL para o config.js e DEVOLVE a promessa (é ela que o controller recebe no .then)
    return database.executar(instrucaoSql);
}

// ---------- FUNÇÃO SALVAR ESTILOS (NOVA) ----------
// grava os pontos dos estilos de música do usuário (se ele já tinha respondido, atualiza)
// estilos = lista [{ idEstilo: 1, pontos: 9 }, { idEstilo: 2, pontos: 7 }, ...]
// é igual ao salvar, só que para a tabela pontuacao_estilo
function salvarEstilos(idUsuario, estilos) {
    // monta as linhas do INSERT, uma para cada estilo
    // exemplo: (7, 1, 9), (7, 2, 7), (7, 3, 8), (7, 4, 8), (7, 5, 8)
    var linhas = "";

    // percorre a lista de estilos: i vale 0, 1, 2, 3, 4
    for (var i = 0; i < estilos.length; i++) {
        if (i > 0) {
            linhas = linhas + ", ";
        }
        // "(" + id do usuário + ", " + id do estilo + ", " + pontos + ")" (Number protege o banco)
        linhas = linhas + "(" + Number(idUsuario) + ", "
                 + Number(estilos[i].idEstilo) + ", "
                 + Number(estilos[i].pontos) + ")";
    }

    // mesma ideia do salvar: ON DUPLICATE KEY UPDATE atualiza quando a pessoa refaz o formulário
    var instrucaoSql = `
        INSERT INTO pontuacao_estilo (fkUsuario, fkEstilo, pontos)
        VALUES ${linhas}
        ON DUPLICATE KEY UPDATE pontos = VALUES(pontos), dtResposta = NOW();
    `;

    return database.executar(instrucaoSql);
}

// ---------- FUNÇÃO LISTAR (igual à anterior) ----------
// busca os pontos do usuário, já do álbum mais compatível para o menos compatível
function listar(idUsuario) {
    // SELECT a.nome AS album, p.pontos : pede o nome do álbum e os pontos
    //   "AS album" dá nome ao campo no resultado (a dashboard lê dados[i].album)
    // FROM pontuacao p : usa a tabela pontuacao, apelidada de p
    // JOIN album a ON a.idAlbum = p.fkAlbum : liga com a tabela album (apelido a) para trazer o NOME do álbum
    // WHERE p.fkUsuario = ... : só as linhas deste usuário
    // ORDER BY p.pontos DESC : ordena do maior para o menor (DESC = decrescente)
    var instrucaoSql = `
        SELECT a.nome AS album, p.pontos
        FROM pontuacao p
        JOIN album a ON a.idAlbum = p.fkAlbum
        WHERE p.fkUsuario = ${Number(idUsuario)}
        ORDER BY p.pontos DESC;
    `;

    // executa e devolve a promessa
    return database.executar(instrucaoSql);
}

// ---------- FUNÇÃO LISTAR ESTILOS (NOVA) ----------
// busca os pontos de cada estilo do usuário, para o gráfico de radar
function listarEstilos(idUsuario) {
    // é parecido com o listar, mas liga pontuacao_estilo com a tabela estilo
    // "AS estilo" dá nome ao campo no resultado (a dashboard vai ler dados[i].estilo)
    // ORDER BY e.idEstilo: no radar os eixos precisam ficar SEMPRE na mesma ordem
    //   (por isso aqui não ordenamos pelos pontos, como no ranking dos álbuns)
    var instrucaoSql = `
        SELECT e.nome AS estilo, p.pontos
        FROM pontuacao_estilo p
        JOIN estilo e ON e.idEstilo = p.fkEstilo
        WHERE p.fkUsuario = ${Number(idUsuario)}
        ORDER BY e.idEstilo;
    `;

    return database.executar(instrucaoSql);
}

// "empresta" as funções para o controller
module.exports = { salvar, salvarEstilos, listar, listarEstilos };
