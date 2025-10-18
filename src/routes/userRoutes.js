import express from 'express';
import { getUsuarios, getPerfil } from '../controllers/userController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/usuarios', authenticateToken, authorizeRoles('admin', 'moderador'), getUsuarios);
router.get('/perfil', authenticateToken, getPerfil);

export default router;