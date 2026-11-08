var database = require("../database/config");

// grava (ou atualiza, se a pessoa refizer o formulário) os pontos dos 4 álbuns de uma vez
function salvar(idUsuario, pontuacoes) {
    var linhas = pontuacoes.map(function (p) {
        return `(${Number(idUsuario)}, ${Number(p.idAlbum)}, ${Number(p.pontos)})`;
    }).join(", ");

    var instrucaoSql = `
        INSERT INTO pontuacao (fkUsuario, fkAlbum, pontos)
        VALUES ${linhas}
        ON DUPLICATE KEY UPDATE pontos = VALUES(pontos), dtResposta = NOW();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// pontos do usuário, do álbum mais compatível ao menos compatível
function listar(idUsuario) {
    var instrucaoSql = `
        SELECT a.nome AS album, p.pontos
        FROM pontuacao p
        JOIN album a ON a.idAlbum = p.fkAlbum
        WHERE p.fkUsuario = ${Number(idUsuario)}
        ORDER BY p.pontos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    listar
};