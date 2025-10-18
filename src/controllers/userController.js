import { users } from '../utils/mockUsers.js';

export const getUsuarios = (req, res) => {
  res.json(users);
};

export const getPerfil = (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.nome}!`, role: req.user.role });
};