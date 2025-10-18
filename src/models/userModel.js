// src/models/userModel.js
import bcrypt from 'bcryptjs';
import { users as mockUsers } from '../utils/mockUsers.js';

const SALT_ROUNDS = 10;
let initialized = false;

/**
 * Inicializa os usuários mock, hashando senhas em texto puro.
 * Garante que isso só acontece uma vez.
 */
async function initializeMockUsersOnce() {
  if (initialized) return;
  for (let i = 0; i < mockUsers.length; i++) {
    const u = mockUsers[i];
    const looksLikeHash = typeof u.senha === 'string' && /^\$2[aby]\$/.test(u.senha);
    if (!looksLikeHash) {
      const hashed = await bcrypt.hash(u.senha, SALT_ROUNDS);
      mockUsers[i] = { ...u, senha: hashed };
    }
  }
  initialized = true;
}

/**
 * Model de usuário (in-memory).
 */
const userModel = {
  /** Retorna todos os usuários sem a senha */
  async getAll() {
    await initializeMockUsersOnce();
    return mockUsers.map(({ senha, ...rest }) => rest);
  },

  /** Busca usuário por email */
  async findByEmail(email) {
    await initializeMockUsersOnce();
    const user = mockUsers.find(u => u.email === email);
    return user ? { ...user } : null;
  },

  /** Busca usuário por id */
  async findById(id) {
    await initializeMockUsersOnce();
    const user = mockUsers.find(u => String(u.id) === String(id));
    return user ? { ...user } : null;
  },

  /** Cria um novo usuário no mock (hash da senha incluso) */
  async createUser(userData) {
    await initializeMockUsersOnce();

    const { nome, email, senha, role = 'usuario' } = userData;
    if (!nome || !email || !senha) throw new Error('nome, email e senha são obrigatórios');

    const exists = mockUsers.some(u => u.email === email);
    if (exists) throw new Error('Usuário com esse email já existe');

    const hashed = await bcrypt.hash(senha, SALT_ROUNDS);
    const newId = mockUsers.length ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1;

    const newUser = { id: newId, nome, email, senha: hashed, role };
    mockUsers.push(newUser);
    const { senha: _s, ...publicUser } = newUser;
    return publicUser;
  },

  /** Compara senha em texto com hash */
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};

export default userModel;