import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
  deleteAllContacts
} from '../controllers/contacts.controller.js';

const router = Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContactById);
router.delete('/:id', deleteContactById);
router.delete('/', deleteAllContacts);

export default router;
