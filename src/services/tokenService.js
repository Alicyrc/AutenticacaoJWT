import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

// Armazenamento em memória (substituir por banco em produção)
const refreshTokens = new Set();

/** Gera um novo par de tokens JWT */
export function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user.id, nome: user.nome, role: user.role },
    jwtConfig.accessToken.secret,
    { expiresIn: jwtConfig.accessToken.expiresIn }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    jwtConfig.refreshToken.secret,
    { expiresIn: jwtConfig.refreshToken.expiresIn }
  );

  refreshTokens.add(refreshToken);
  return { accessToken, refreshToken };
}

/** Valida o Refresh Token */
export function validateRefreshToken(token) {
  if (!refreshTokens.has(token)) return null;

  try {
    const decoded = jwt.verify(token, jwtConfig.refreshToken.secret);
    return decoded;
  } catch {
    return null;
  }
}

/** Revoga um refresh token (logout ou rotação) */
export function revokeToken(token) {
  refreshTokens.delete(token);
}