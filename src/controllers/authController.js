// src/controllers/authController.js
import userModel from '../models/userModel.js';
import { generateTokens, validateRefreshToken, revokeToken } from '../services/tokenService.js';

/** Login */
export const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

  const user = await userModel.findByEmail(email);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const senhaValida = await userModel.comparePassword(senha, user.senha);
  if (!senhaValida) return res.status(401).json({ error: 'Credenciais inválidas' });

  const { senha: _, ...userData } = user;
  const tokens = generateTokens(userData);

  return res.json(tokens);
};

/** Renovar Access Token */
export const refresh = async (req, res) => { // 👈 Mudança 1: Define a função como assíncrona
  try {
    // 👈 Mudança 2: Lê o Refresh Token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(' ')[1]; 
    
    if (!refreshToken) {
      // Retorna 400 se o token não estiver no cabeçalho
      return res.status(400).json({ error: 'Token de atualização não fornecido no cabeçalho Authorization' });
    }

    // Valida o token (a lógica de tokenService já trata erros JWT)
    const decoded = validateRefreshToken(refreshToken);
    
    if (!decoded) {
      return res.status(403).json({ error: 'Token de atualização inválido ou expirado' });
    }

    revokeToken(refreshToken);

    // 👈 Mudança 3: Usa await para tratar a promise e evitar o erro 500 não capturado
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { senha: _, ...userData } = user;
    const tokens = generateTokens(userData);

    return res.json(tokens);
    
  } catch (error) {
    // 👈 Mudança 4: Captura qualquer erro de execução e evita o 500 genérico
    console.error('Erro durante a renovação do token:', error);
    // Em produção, isso deve ser mais específico, mas para I/O é 500
    return res.status(500).json({ error: 'Erro interno do servidor durante a renovação do token' });
  }
};

/** Logout */
export const logout = (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) revokeToken(refreshToken);
  res.json({ message: 'Logout realizado com sucesso' });
};