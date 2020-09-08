const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const express = require('express');
const cors = require('cors');

const { contactsRouter } = require('./contacts/contacts.router');

module.exports.CRUDServer = {
  app: null,

  initServer() {
    app = express();
  },

  initMiddlewares() {
    app.use(express.json());
    app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
  },

  initRoutes() {
    app.use('/contacts', contactsRouter);
  },

  initErrorHandling() {
    app.use((err, req, res, next) => {
      const status = err.status || 500;

      return res.status(status).send(err.message);
    });
  },

  startListening() {
    app.listen(process.env.PORT, () => {
      console.log('Started listening on port', process.env.PORT);
    });
  },

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  },
};
