const { contactsModel } = require('./contacts.model');
const promiseHandler = require('../helpers/helpers');

exports.getContacts = async (req, res, next) => {
  const [error, contacts] = await promiseHandler(contactsModel.listContacts());
  const parsedContacts = JSON.parse(contacts);

  res.status(200).json(parsedContacts);

  if (error) {
    next(error);
  }
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
  res.status(200).json(contact);

  if (error) {
    next(error);
  }
};

exports.addContact = async (req, res, next) => {
  const [error, newContact] = await promiseHandler(
    contactsModel.addContact(req.body)
  );
  res.status(201).json(newContact);

  if (error) {
    next(error);
  }
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

  res.status(200).json({ message: 'Contact deleted' });

  if (error) {
    next(error);
  }
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

  res.status(200).json(updatedContact);

  if (errorContact || errorUpdate) {
    next(errorContact || errorUpdate);
  }
};
