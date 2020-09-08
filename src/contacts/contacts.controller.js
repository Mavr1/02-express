const { contactsModel } = require('./contacts.model');

exports.getContacts = async (req, res, next) => {
  const contacts = await contactsModel.listContacts();

  res.status(200).send(contacts);
};

exports.getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsModel.findContactById(contactId);
  if (!contact) {
    return res.status(404).send('Contact not found');
  }

  res.status(200).send(contact);
};

exports.addContact = async (req, res, next) => {
  const newContact = await contactsModel.addContact(req.body);

  res.status(201).send(newContact);
};

exports.removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsModel.findContactById(contactId);
  if (!contact) {
    res.status(404).send('Contact not found');
  }

  contactsModel.removeContact(contactId);

  res.status(200).send('Contact deleted');
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsModel.findContactById(contactId);
  if (!contact) {
    return res.status(404).send('Contact not found');
  }

  const updatedContact = await contactsModel.updateContact(contactId, req.body);

  res.status(200).send(updatedContact);
};
