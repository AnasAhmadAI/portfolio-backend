import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  deleteAllUsers
} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.delete('/', deleteAllUsers);

export default router;
