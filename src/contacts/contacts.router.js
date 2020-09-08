const { Router } = require('express');
const Joi = require('joi');
const { validate } = require('../helpers/validate');
const {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
} = require('./contacts.controller');

const router = Router();

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

router.get('/', getContacts);

router.get('/:contactId', getContact);

router.post('/', validate(addContactSchema), addContact);

router.delete('/:contactId', removeContact);

router.patch('/:contactId', validate(updateContactSchema), updateContact);

exports.contactsRouter = router;
