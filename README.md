
<div align="center">

# ୨୧ Gerenciamento de Tarefas ୨୧

### ♡ Organização, praticidade e um toque de carinho ♡

Sistema web desenvolvido para o gerenciamento de tarefas de uma indústria alimentícia.

**SENAI | Técnico em Desenvolvimento de Sistemas | SAEP**

`HTML` · `CSS` · `JavaScript` · `Node.js` · `Express` · `Prisma` · `MariaDB`

⋆ ˚｡⋆୨୧˚ ⋆｡˚ ⋆

</div>

## ♡ Sobre o projeto

O **Gerenciamento de Tarefas** é uma aplicação web desenvolvida como parte da avaliação prática SAEP do curso Técnico em Desenvolvimento de Sistemas do SENAI.

O sistema foi criado para facilitar a organização das atividades de uma indústria alimentícia, permitindo cadastrar usuários, atribuir responsabilidades e acompanhar o andamento das tarefas.

A aplicação possui uma interface simples e intuitiva, com um quadro Kanban para visualizar as atividades de maneira organizada.

## ୨୧ Tecnologias utilizadas

| Camada | Tecnologias |
|--------|-------------|
| ♡ Frontend | HTML5, CSS3 e JavaScript |
| ♡ Backend | Node.js e Express.js |
| ♡ ORM | Prisma |
| ♡ Banco de dados | MariaDB |
| ♡ Desenvolvimento | Visual Studio Code |

## ♡ Funcionalidades

### 01. Cadastro de usuários

- Cadastrar usuários com nome e e-mail.
- Validar os campos obrigatórios.
- Armazenar as informações no banco de dados.
- Listar usuários para atribuição de tarefas.

### 02. Cadastro de tarefas

- Cadastrar novas tarefas.
- Informar descrição e setor.
- Selecionar o usuário responsável.
- Definir a prioridade da atividade.
- Editar informações de tarefas cadastradas.

### 03. Gerenciamento de tarefas

- Visualizar as atividades em um quadro Kanban.
- Acompanhar o andamento das tarefas.
- Alterar o status das atividades.
- Editar e excluir tarefas.
- Consultar responsáveis e prioridades.

## ୨୧ Quadro Kanban

As tarefas são organizadas em três etapas:

| Status | Descrição |
|--------|-----------|
| ♡ A fazer | Atividades que ainda não foram iniciadas. |
| ♡ Fazendo | Atividades que estão em andamento. |
| ♡ Pronto | Atividades que foram concluídas. |

### Prioridades

| Prioridade | Descrição |
|------------|-----------|
| `BAIXA` | Atividade de baixa prioridade. |
| `MEDIA` | Atividade de prioridade média. |
| `ALTA` | Atividade de alta prioridade. |

## ♡ Estrutura do projeto

```text
Simulado SAEP 2 - Gerenciamento de Tarefas/
│
├── Alice - Back-End/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── data/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Alice - Front-End/
│   ├── index.html
│   ├── tarefas.html
│   ├── gerenciar.html
│   ├── style.css
│   └── script.js
│
├── Alice - Docs/
│   ├── diagramaentidadesderelacionamento.png
│   └── diagramamododeuso.png
│
└── README.md
```

## ୨୧ Banco de dados

O sistema utiliza o **MariaDB**, com duas entidades principais: `Usuarios` e `Tarefas`.

### Tabela Usuarios

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único do usuário. |
| `nome` | Nome completo do usuário. |
| `email` | E-mail do usuário. |

### Tabela Tarefas

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único da tarefa. |
| `usuarioId` | Identificador do usuário responsável. |
| `descricao` | Descrição da atividade. |
| `setor` | Setor relacionado à tarefa. |
| `prioridade` | Prioridade da tarefa. |
| `dataCadastro` | Data de cadastro. |
| `status` | Situação atual da tarefa. |

### Relacionamento

O relacionamento entre as entidades é de **1:N (um para muitos)**.

Um usuário pode possuir várias tarefas, enquanto cada tarefa está vinculada a um único usuário.

A associação ocorre por meio da chave estrangeira `usuarioId`.

## ♡ Diagramas do sistema

Para representar a estrutura e as funcionalidades da aplicação, foram desenvolvidos dois diagramas.

### ୨୧ Diagrama Entidade-Relacionamento (DER)

O DER representa a estrutura do banco de dados, apresentando as entidades `Usuarios` e `Tarefas`, seus atributos e o relacionamento entre elas.

<div align="center">

![Diagrama Entidade-Relacionamento](Alice%20-%20Docs/diagramaentidadesderelacionamento.png)

</div>

### ୨୧ Diagrama de Casos de Uso

O diagrama de casos de uso representa as principais funcionalidades disponíveis no sistema e a interação dos usuários com a aplicação.

<div align="center">

![Diagrama de Casos de Uso](Alice%20-%20Docs/diagramamododeuso.png)

</div>

## ♡ Rotas da API

A aplicação utiliza uma API REST para realizar as operações de cadastro, consulta, atualização e exclusão.

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/usuarios/listar` | Lista os usuários. |
| `POST` | `/usuarios/cadastrar` | Cadastra um usuário. |

### Tarefas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/tarefas/listar` | Lista as tarefas. |
| `GET` | `/tarefas/buscar/:id` | Busca uma tarefa por ID. |
| `POST` | `/tarefas/cadastrar` | Cadastra uma tarefa. |
| `PUT` | `/tarefas/atualizar/:id` | Atualiza uma tarefa. |
| `DELETE` | `/tarefas/excluir/:id` | Exclui uma tarefa. |

## ୨୧ Como executar

### 01. Instalar as dependências

Abra o terminal na pasta `Alice - Back-End` e execute:

```bash
npm install
```

### 02. Configurar o banco de dados

Configure o arquivo `.env` com os dados de conexão do MariaDB.

Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/gerenciamento_tarefas"
PORT=3000
```

Substitua os valores pelas configurações do seu ambiente.

### 03. Gerar o Prisma Client

```bash
npx prisma generate
```

O banco de dados deve estar criado e com a estrutura correspondente ao `schema.prisma`.

### 04. Iniciar o backend

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

### 05. Executar o frontend

Abra a pasta `Alice - Front-End` no Visual Studio Code e execute o arquivo `index.html` utilizando o Live Server.

**Importante:** o backend deve permanecer em execução para que o frontend consiga acessar os dados.

## ♡ Páginas do sistema

### `index.html` — Cadastro de usuários

Página responsável pelo cadastro de novos usuários, contendo os campos de nome e e-mail.

### `tarefas.html` — Cadastro de tarefas

Página utilizada para cadastrar e editar atividades, permitindo informar descrição, setor, responsável e prioridade.

### `gerenciar.html` — Gerenciamento de tarefas

Página responsável pelo acompanhamento das atividades por meio de um quadro Kanban, dividido em três colunas:

- A fazer
- Fazendo
- Pronto

Permite atualizar o status, editar e excluir tarefas.

## ୨୧ Entregas da atividade

A avaliação prática contempla seis entregáveis:

- [x] Diagrama Entidade-Relacionamento (DER).
- [ ] Exportação SQL do banco de dados.
- [x] Diagrama de Casos de Uso.
- [x] Página de Cadastro de Usuários.
- [x] Página de Cadastro de Tarefas.
- [x] Página de Gerenciamento de Tarefas.

## ♡ Objetivo

Desenvolver uma aplicação web integrada a um banco de dados relacional, aplicando os conhecimentos adquiridos durante o curso Técnico em Desenvolvimento de Sistemas.

O projeto contempla modelagem de dados, desenvolvimento frontend, construção de APIs REST e operações CRUD.

A solução tem como finalidade facilitar a organização, a distribuição e o acompanhamento das tarefas de uma indústria alimentícia.


---

<div align="center">

### ⋆ ˚｡⋆୨୧˚ ⋆｡˚ ⋆

**Desenvolvido com carinho por Alice 𖹭**

♡ ୨୧ ♡

**SENAI · Desenvolvimento de Sistemas · 2026**

</div>
