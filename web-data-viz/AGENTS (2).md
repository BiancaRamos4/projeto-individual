# AGENTS.md

## Visão geral

Este projeto é a adaptação da aplicação existente "web-data-viz" para um site sobre a banda The Smiths. O objetivo é apresentar a banda a novos ouvintes e recomendar, de forma visual e personalizada, os álbuns que podem combinar com os gostos musicais de cada pessoa.

A experiência planejada inclui:
Home pública: história do The Smiths e explicação breve dos temas recorrentes nas músicas dos álbuns.
Login público: e-mail e senha.
Cadastro público:nome, e-mail e senha.
Formulário de preferências:acessível após o login; coleta gostos musicais, como preferência por músicas melancólicas, românticas e outros temas/estados de espírito.
Dashboard personalizada:gráfico de barras feito com Chart.js, mostrando quais álbuns parecem mais compatíveis com as respostas do usuário.

O repositório já contém uma aplicação funcional de referência. O objetivo é adaptar a aplicação existente, não reescrevê-la. A estrutura atual usa páginas HTML estáticas servidas pelo Express, rotas, controllers, models e conexão MySQL.

## Tecnologias

- Node.js:para executar o servidor.
- MySQL com o pacote `mysql2` para persistência.
- HTML, CSS e JavaScript nas páginas em `public/`.
- Chart.js é a biblioteca planejada para o gráfico da dashboard
- dotenv para carregar variáveis de ambiente.


As dependências e versões declaradas estão em `package.json`. Não altere esse arquivo nem adicione bibliotecas sem necessidade comprovada e sem explicar o motivo.

## Comandos

Execute os comandos na pasta raiz `web-data-viz/`:

- "npm install" — instala as dependências declaradas em package.json.
- "npm start" — inicia a aplicação com node app.js.
- "npm run dev" — inicia a aplicação com nodemon, reiniciando o servidor quando arquivos monitorados mudam.

A aplicação carrega .env.dev quando ambiente_processo está definido como desenvolvimento no app.js, e .env quando está configurado para producao. O arquivo app.js informa no terminal o endereço e a porta configurados.

Não mostre, copie ou inclua valores de credenciais de `.env` ou `.env.dev` em respostas, logs, commits ou arquivos de documentação.

## Arquitetura

- `app.js`: configura o ambiente, carrega variáveis, configura Express, JSON, formulários, arquivos estáticos e CORS; registra as rotas e inicia o servidor.
- `public/`: contém as páginas HTML, CSS, JavaScript do navegador, imagens e demais arquivos estáticos.
  - `public/index.html`: página inicial atual da aplicação de referência; será adaptada para a home do The Smiths.
  - `public/login.html`: página de login existente.
  - `public/cadastro.html`: página de cadastro existente.
  - `public/simulador.html`: página de exemplo que pode ser reaproveitada ou substituída somente após verificar seu uso.
  - `public/dashboard/`: páginas protegidas/relacionadas à área interna da aplicação de referência (`cards.html`, `dashboard.html`, `edicao-aviso.html`, `mural.html`). Verifique dependências antes de reaproveitar, renomear ou remover arquivos.
  - `public/js/`: scripts de navegador, incluindo `sessao.js` e `alerta.js`.
  - `public/css/` e `public/assets/`: estilos e recursos visuais.
- `src/routes/`: define os caminhos HTTP e encaminha requisições aos controllers.
  - `index.js`: rota `/`.
  - `usuarios.js`: rotas de cadastro e autenticação.
  - `avisos.js`, `medidas.js`, `aquarios.js`, `empresas.js`: rotas dos recursos existentes.
- `src/controllers/`: recebe e valida dados da requisição e coordena a chamada aos models.
- `src/models/`: contém as consultas ao banco de dados.
- `src/database/config.js`: cria a conexão MySQL usando variáveis de ambiente e expõe a função `executar`.
- `src/database/script-tabelas.sql`: script de referência para criação das tabelas do projeto original. O banco e as tabelas reais devem ser conferidos antes de qualquer alteração.

### Fluxo de uma requisição

Para uma funcionalidade que consulta ou grava dados, siga o fluxo já usado no projeto:

Página HTML/JavaScript em `public/` → `fetch()` → rota em `src/routes/` → controller em `src/controllers/` → model em `src/models/` → MySQL por `src/database/config.js` → resposta HTTP → atualização da interface.**

Exemplo existente: o front-end envia requisições para `/usuarios/cadastrar` ou `/usuarios/autenticar`, definidas em `src/routes/usuarios.js`. Essas rotas chamam as funções correspondentes em `usuarioController.js`, que por sua vez utilizam `usuarioModel.js`.

### Como implementar as funcionalidades novas

- Adapte primeiro as páginas existentes em `public/`, mantendo a navegação e os recursos necessários.
- Para cadastro e login, inspecione e reutilize as rotas existentes antes de criar novas. Os campos e o formato enviado por `fetch()` precisam corresponder exatamente ao que o controller espera.
- Para o formulário de preferências, verifique primeiro se há estrutura de tabela e endpoints adequados. Caso seja necessário persistir respostas, proponha a menor extensão possível: tabela, model, controller e rota seguindo os padrões existentes.
- Para a dashboard, recupere as respostas do usuário autenticado, aplique uma regra de correspondência clara entre respostas e álbuns e use os resultados para alimentar o Chart.js. Não use valores fixos ou inventados como resultado personalizado definitivo.
- Mantenha a lógica de correspondência simples, legível e fácil de explicar. Documente como as respostas geram a pontuação dos álbuns.
- Se for necessário criar uma rota, registre-a em `app.js` e implemente-a seguindo o padrão `routes → controllers → models`.
- Não crie tabelas, endpoints ou arquivos duplicados se já existir uma solução compatível no projeto.

## Padrões de desenvolvimento

- Siga o estilo já existente nos arquivos próximos à alteração.
- O projeto usa atualmente CommonJS (`require` e `module.exports`) no back-end; mantenha esse padrão.
- Priorize `const` e use `let` quando precisar reatribuir valores, respeitando a compatibilidade com o código existente.
- Use nomes claros e consistentes para funções, variáveis, arquivos e rotas.
- Mantenha cada camada responsável por sua função: rotas encaminham, controllers tratam requisições/respostas e models consultam o banco.
- Trate erros de API e de banco sem expor detalhes sensíveis ao usuário.
- Faça alterações pequenas e teste uma funcionalidade por vez.
- Ao concluir, informe quais arquivos foram alterados, o que mudou e como testar.

## Cuidados e restrições

Não reescreva a API do zero.
- Não apague arquivos, pastas, rotas, funções, tabelas ou configurações existentes sem necessidade demonstrada e autorização explícita.
- Não remova as páginas de referência ou os recursos existentes antes de mapear suas dependências.
- Não faça refatorações amplas fora do escopo do site The Smiths.
- Não altere a configuração de ambiente, as credenciais ou os scripts de execução sem necessidade e explicação.
- Não assuma que o conteúdo de `script-tabelas.sql` corresponde exatamente ao banco que está em uso; confirme o esquema real antes de propor alterações.
- Antes de editar, examine o arquivo completo e os arquivos relacionados. Prefira mudanças localizadas e reversíveis.
- Não coloque credenciais, tokens, senhas reais ou valores de arquivos de ambiente no código do navegador, em commits ou na documentação.
- Não instale Chart.js ou outras bibliotecas sem verificar primeiro se já existe uma forma de carregamento no projeto. Explique qualquer dependência nova antes de adicioná-la.
- Áudios de músicas podem estar sujeitos a direitos autorais. Não baixe nem incorpore arquivos protegidos sem autorização; priorize fontes oficiais ou opções de incorporação permitidas e deixe o recurso de áudio para depois do fluxo principal.

### Forma de trabalho do agente

Antes de cada alteração:
1. Leia os arquivos envolvidos e identifique o fluxo atual.
2. Explique em poucas linhas o que pretende alterar e por quê.
3. Informe quais arquivos e, se aplicável, tabelas serão afetados.
4. Preserve comportamentos não relacionados ao pedido.
5. Faça a menor alteração viável.
6. Verifique a sintaxe e teste o fluxo afetado quando possível.
7. Relate o resultado e qualquer limitação que não tenha sido possível verificar.

Se alguma informação estiver ausente, analise o código existente e siga os padrões já adotados no projeto. Não invente funcionalidades, comandos, rotas ou estrutura de banco.

## Regra geral

A prioridade é adaptar o site do The Smiths à aplicação `web-data-viz` existente com o mínimo de alterações necessárias, preservando a estrutura funcional e explicando as mudanças de forma compreensível para uma pessoa que está aprendendo desenvolvimento web.
