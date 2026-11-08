-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

USE projeto_the_smiths
CREATE TABLE album (
  idAlbum INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  anoLancamento INT
);
 
INSERT INTO album (nome, anoLancamento) VALUES
('The Smiths', 1984),
('Meat Is Murder', 1985),
('The Queen Is Dead', 1986),
('Strangeways, Here We Come', 1987);
 
CREATE TABLE pontuacao (
  fkUsuario INT,
  fkAlbum INT,
  pontos INT NOT NULL,
  dtResposta DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (fkUsuario, fkAlbum),
  FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
  FOREIGN KEY (fkAlbum) REFERENCES album(idAlbum)
);