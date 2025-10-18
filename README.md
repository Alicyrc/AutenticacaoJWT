# AutenticacaoJWT

# 🔐 Autenticação JWT com Node.js e Express

Este projeto implementa um sistema completo de **autenticação com JSON Web Token (JWT)**, incluindo **login, geração de tokens de acesso e atualização (refresh token)**, e rotas protegidas.  
O objetivo é demonstrar uma arquitetura segura e escalável para autenticação em APIs RESTful.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — ambiente de execução JavaScript
- **Express.js** — framework para criação de rotas e middlewares
- **jsonwebtoken (JWT)** — autenticação baseada em tokens
- **dotenv** — gerenciamento de variáveis de ambiente
- **bcryptjs** — hash e comparação de senhas
- **nodemon** — reinicialização automática durante o desenvolvimento

---

## 📂 Estrutura do Projeto

autenticacaoJWT/
│
├── src/
│ ├── config/
│ │ └── jwtConfig.js # Configurações das chaves secretas e tempo de expiração
│ │
│ ├── controllers/
│ │ └── authController.js # Lógica de login e refresh de tokens
│ │
│ ├── middlewares/
│ │ └── authMiddleware.js # Verificação do token de acesso nas rotas protegidas
│ │
│ ├── routes/
│ │ └── authRoutes.js # Definição das rotas de autenticação
│ │
│ ├── services/
│ │ └── tokenService.js # Criação e validação de tokens JWT
│ │
│ ├── server.js # Ponto de entrada da aplicação
│ └── .env # Variáveis de ambiente (não versionar)
│
├── package.json
└── README.md

---

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuusuario/autenticacaoJWT.git
   cd autenticacaoJWT
- Instale as dependências

'npm install'

- Crie o arquivo .env na raiz do projeto

'JWT_SECRET=sua_chave_super_segura
JWT_REFRESH_SECRET=sua_chave_refresh_super_segura
PORT=3000'

- Inicie o servidor

'npm run dev'

O servidor iniciará em:
👉 http://localhost:3000

---

🔑 Endpoints da API
1. Login
Autentica o usuário e gera os tokens de acesso e atualização.

POST /api/auth/login

Body:

{
  "email": "usuario@teste.com",
  "password": "123456"
}

Resposta:

{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}


2. Atualização de Token
Gera um novo token de acesso a partir de um refresh token válido.

POST /api/auth/refresh

Headers:

Authorization: Bearer <seu_refresh_token>
Resposta:

{
  "accessToken": "novo_access_token"
}


3. Rotas Protegida
Rotas que exigem autenticação via token de acesso.

GET /api/usuarios

Headers:

Authorization: Bearer <seu_access_token>

Resposta:

{
  id: 1, 
  nome: 'Usuario1', 
  email: 'user1@exemplo.com', 
  senha: '123456', 
  role: 'admin'
},
{
  id: 2, 
  nome: 'Usuario2', 
  email: 'user2@exemplo.com', 
  senha: '123456', 
  role: 'usuario'
},
{ 
  id: 3, 
  nome: 'Usuario3', 
  email: 'user3@exemplo.com', 
  senha: '123456', 
  role: 'moderador' 
}

GET /api/perfil

Headers:

Authorization: Bearer <seu_access_token>

Resposta:

{ 
  message: `Bem-vindo, ${req.user.nome}!`, 
  role: req.user.role
}

---

🧪 Testando com Postman
Faça login (/login) e copie o accessToken e refreshToken.

Use o accessToken para acessar a rota protegida /usuarios.

Quando o accessToken expirar, envie o refreshToken para /refresh e obtenha um novo token.

---

⚠️ Tratamento de Erros
Erro	                        Descrição
Token não fornecido	          Cabeçalho Authorization ausente
Token inválido ou expirado	  Token incorreto ou fora do prazo de validade
JWT_SECRET não definido	      Variáveis de ambiente ausentes no .env

---

🧠 Conceitos-Chave

Access Token: curto prazo (ex: 15 minutos). Usado para acessar rotas protegidas.

Refresh Token: longo prazo (ex: 7 dias). Usado apenas para gerar novos access tokens.

Bearer Token: padrão de autenticação no cabeçalho HTTP.

---

🧩 Possíveis Extensões

Registro de usuários com hash de senha (bcryptjs)

Logout com blacklist de tokens

Integração com banco de dados (MySQL, MongoDB)

Rotas de redefinição de senha

Implementação de autenticação via OAuth2 (Google, GitHub, etc.)

---

🧑‍💻 Autor
Alicy Rodrigues
📧 Email: alicyrc@hotmail.com
💻 Projeto desenvolvido para fins acadêmicos — Programação Back-End Avançada - 6º Período
