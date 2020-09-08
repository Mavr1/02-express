const shortid = require('shortid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.join(process.cwd(), './db/contacts.json');

exports.contactsModel = {
  async listContacts() {
    const contacts = await fs.promises.readFile(contactsPath, 'utf8');
    return contacts;
  },

  async findContactById(id) {
    const contacts = await fs.promises.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts).find((contact) => contact.id === id);
  },

  async addContact(contactParams) {
    const id = shortid.generate();
    const newContact = { id, ...contactParams };

    const response = await fs.promises.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    contacts.push(newContact);

    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  },

  async removeContact(id) {
    const response = await fs.promises.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);

    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }

    contacts.splice(idx, 1);
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
  },

  async updateContact(id, paramsToUpdate) {
    const response = await fs.promises.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);

    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }

    contacts[idx] = { ...contacts[idx], ...paramsToUpdate };

    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  },
};
