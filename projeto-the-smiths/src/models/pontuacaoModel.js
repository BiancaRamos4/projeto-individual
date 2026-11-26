var database = require("../database/config");

// grava os pontos dos álbuns do usuário (se ele já tinha respondido, atualiza)
function salvar(idUsuario, pontuacoes) {
    // monta as linhas do INSERT, uma para cada álbum: (usuario, album, pontos), (usuario, album, pontos), ...
    var linhas = "";
    for (var i = 0; i < pontuacoes.length; i++) {
        if (i > 0) {
            linhas = linhas + ", ";
        }
        // Number() garante que só entra número no SQL
        linhas = linhas + "(" + Number(idUsuario) + ", " + Number(pontuacoes[i].idAlbum) + ", " + Number(pontuacoes[i].pontos) + ")";
    }

    var instrucaoSql = `
        INSERT INTO pontuacao (fkUsuario, fkAlbum, pontos)
        VALUES ${linhas}
        ON DUPLICATE KEY UPDATE pontos = VALUES(pontos);
    `;
     // executa e devolve a promessa
    return database.executar(instrucaoSql);
}

// busca os pontos do usuário, do álbum mais compatível ao menos compatível
function listar(idUsuario) {
    var instrucaoSql = `
        SELECT a.nome AS album, p.pontos
        FROM pontuacao p
        JOIN album a ON a.idAlbum = p.fkAlbum
        WHERE p.fkUsuario = ${Number(idUsuario)}
        ORDER BY p.pontos DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = { salvar, listar };
