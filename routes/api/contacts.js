const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contactsModels');

const validateBody = require('../../middlewares/validateBody');
const { contactSchema, updateContactSchema } = require('../../schemas/contactsSchemas');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateBody(contactSchema), async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateBody(updateContactSchema), async (req, res, next) => {
  try {
    const updated = await updateContact(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
