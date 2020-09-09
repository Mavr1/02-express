const { contactsModel } = require('./contacts.model');

exports.getContacts = async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  const parsedContacts = JSON.parse(contacts);

  res.status(200).json(parsedContacts);
};

exports.getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsModel.findContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(200).json(contact);
};

exports.addContact = async (req, res, next) => {
  const newContact = await contactsModel.addContact(req.body);

  res.status(201).json(newContact);
};

exports.removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsModel.findContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
  }

  contactsModel.removeContact(contactId);

  res.status(200).json({ message: 'Contact deleted' });
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsModel.findContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  const updatedContact = await contactsModel.updateContact(contactId, req.body);

  res.status(200).json(updatedContact);
};
