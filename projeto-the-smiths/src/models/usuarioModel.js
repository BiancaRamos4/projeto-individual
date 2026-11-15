var database = require("../database/config");

// protege o SQL: coloca uma barra antes de aspas simples, para o texto digitado não virar comando
// proteje da injeção de sql

 // .replace(/\\/g, "\\\\"): troca cada barra \ por duas barras \\  (os trechos entre / / são "expressões regulares",
// um jeito de procurar padrões em texto; o g quer dizer "todas as ocorrências")
// .replace(/'/g, "\\'"): troca cada aspa simples ' por \'

function limpar(texto) {
    return String(texto).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

// procura um usuário com esse e-mail e essa senha
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario
        WHERE email = '${limpar(email)}' AND senha = '${limpar(senha)}';
    `;
    return database.executar(instrucaoSql);
}

// cria um usuário novo (o id o banco gera sozinho)
function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${limpar(nome)}', '${limpar(email)}', '${limpar(senha)}');
    `;
     // executa e devolve a promessa
    return database.executar(instrucaoSql);
}

module.exports = { autenticar, cadastrar };
