var database = require("../database/config");

// evita que aspas e barras quebrem o comando SQL
function limpar(texto) {
    return String(texto).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario
        WHERE email = '${limpar(email)}' AND senha = '${limpar(senha)}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${limpar(nome)}', '${limpar(email)}', '${limpar(senha)}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};