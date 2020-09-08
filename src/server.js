const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { contactsRouter } = require('./contacts/contacts.router');

module.exports.CRUDServer = {
  app: null,

  initServer() {
    this.app = express();
  },

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
    this.app.use(morgan('tiny'));
  },

  initRoutes() {
    this.app.use('/contacts', contactsRouter);
  },

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;

      return res.status(status).send(err.message);
    });
  },

  startListening() {
    this.app.listen(process.env.PORT, () => {
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
