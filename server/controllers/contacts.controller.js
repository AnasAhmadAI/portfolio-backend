import Contact from '../models/contact.model.js';

export async function getAllContacts(req, res) {
  const contacts = await Contact.find().lean();
  res.json(contacts);
}

export async function getContactById(req, res) {
  const contact = await Contact.findById(req.params.id).lean();
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
}

export async function createContact(req, res) {
  const { firstname, lastname, email } = req.body;
  if (!firstname || !lastname || !email) {
    return res.status(400).json({ message: 'firstname, lastname, and email are required' });
  }
  const created = await Contact.create({ firstname, lastname, email });
  res.status(201).json(created);
}

export async function updateContactById(req, res) {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Contact not found' });
  res.json(updated);
}

export async function deleteContactById(req, res) {
  const deleted = await Contact.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: 'Contact not found' });
  res.json({ message: 'Contact removed', id: req.params.id });
}

export async function deleteAllContacts(req, res) {
  const result = await Contact.deleteMany({});
  res.json({ message: 'All contacts removed', deletedCount: result.deletedCount });
}
