import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, jwtConfig.accessToken.secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

/** Middleware de autorização por perfil */
export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
    next();
  };
}