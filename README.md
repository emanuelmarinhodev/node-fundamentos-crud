# 🚀 Task Manager API - Node.js Streams & CRUD

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=nodedotjs" />
  <img alt="Streams" src="https://img.shields.io/badge/Node_Streams-Native-000000?style=for-the-badge" />
  <img alt="CSV Parse" src="https://img.shields.io/badge/CSV_Parse-Library-yellow?style=for-the-badge" />
</p>

## 💻 Sobre o Projeto

Este projeto é uma API REST desenvolvida em **Node.js puro (sem frameworks)**, como parte de um desafio prático para aprofundar conhecimentos nos fundamentos do runtime.

O objetivo foi construir um sistema completo de gerenciamento de tarefas (CRUD), manipulando rotas HTTP manualmente, persistindo dados em JSON e implementando uma **funcionalidade avançada de importação de CSV via Streams**.

### ⚙️ Funcionalidades

- **CRUD Completo:** Criação, leitura, atualização e remoção de tarefas.
- **Busca Filtrada:** Listagem de tarefas com filtro por `title` e `description` via Query Parameters.
- **Upload via Streams:** Script dedicado para importação em massa de tarefas via arquivo CSV, processando linha a linha sem sobrecarregar a memória.
- **Persistência Local:** Banco de dados JSON simulado com persistência em arquivo físico.
- **Validações de Regra de Negócio:**
  - Checagem de existência de registros (ID).
  - Validação de campos obrigatórios no Body da requisição.
  - Atualização parcial de dados (PATCH) e toggle de status de conclusão.

## 🛠 Tecnologias Utilizadas

- **Node.js (Módulos Nativos):**
  - `http`: Criação do servidor e gerenciamento de rotas.
  - `fs` (File System): Leitura e escrita do banco de dados e arquivos CSV.
  - `stream`: Manipulação de grandes volumes de dados (importação CSV).
  - `crypto`: Geração de UUIDs.
- **Bibliotecas Externas:**
  - `csv-parse`: Para realizar o parseamento das streams de leitura do CSV.

## 🚀 Como Executar

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/emanuelmarinhodev/node-fundamentos-crud.git
   
2. Instale as dependências:
   ```bash
   npm install

3. Execute o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
  O servidor iniciará na porta 3333.

### Importação de CSV (Diferencial)

Para testar a importação em massa via Streams:

1. Mantenha o servidor rodando em um terminal.
2. Abra um **segundo terminal**.
3. Execute o script de importação:
   ```bash
   node import-csv.js

## 🔗 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| **GET** | `/tasks` | Lista todas as tarefas. Aceita filtro `?search=termo`. |
| **POST** | `/tasks` | Cria uma nova tarefa. Body: `{ "title": "...", "description": "..." }`. |
| **PUT** | `/tasks/:id` | Atualiza uma tarefa (título e/ou descrição). |
| **DELETE** | `/tasks/:id` | Remove uma tarefa pelo ID. |
| **PATCH** | `/tasks/:id/complete` | Marca ou desmarca uma tarefa como concluída. |

## 🧠 Aprendizados

Durante o desenvolvimento deste projeto, o foco foi entender o funcionamento interno do Node.js antes de utilizar frameworks:

- **HTTP Deep Dive:** Compreensão de como buffers, headers e status codes funcionam nativamente.
- **Streams & Buffers:** Aplicação prática de `Readable` e `Writable` streams para performance na leitura de arquivos e upload de CSV.
- **Regex:** Criação de rotas dinâmicas com parâmetros (ex: `/:id`) usando Expressões Regulares.
- **CRUD Sem Banco SQL:** Lógica de manipulação de dados e persistência em arquivos JSON.

---
Feito com 💜 e Node.js.
