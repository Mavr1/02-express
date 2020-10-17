const { contactsModel } = require('./contacts.model');
const promiseHandler = require('../helpers/helpers');

exports.getContacts = async (req, res, next) => {
  const [error, contacts] = await promiseHandler(contactsModel.listContacts());
  const parsedContacts = JSON.parse(contacts);

  if (error) {
    next(error);
  }

  res.status(200).json(parsedContacts);
};

exports.getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const [error, contact] = await promiseHandler(
    contactsModel.findContactById(contactId)
  );
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  if (error) {
    next(error);
  }

  res.status(200).json(contact);
};

exports.addContact = async (req, res, next) => {
  const [error, newContact] = await promiseHandler(
    contactsModel.addContact(req.body)
  );

  if (error) {
    next(error);
  }

  res.status(201).json(newContact);
};

exports.removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const [error, contact] = await promiseHandler(
    contactsModel.findContactById(contactId)
  );
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  contactsModel.removeContact(contactId);

  if (error) {
    next(error);
  }

  res.status(200).json({ message: 'Contact deleted' });
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const [errorContact, contact] = await promiseHandler(
    contactsModel.findContactById(contactId)
  );
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  const [errorUpdate, updatedContact] = await promiseHandler(
    contactsModel.updateContact(contactId, req.body)
  );

  if (errorContact || errorUpdate) {
    next(errorContact || errorUpdate);
  }

  res.status(200).json(updatedContact);
};
