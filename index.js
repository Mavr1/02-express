const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

app.get('/hello', (req, res, next) => {
  console.log(req.query);
  return res.status(200).send();
});

app.listen(process.env.PORT, () => {
  console.log('started listening on port', process.env.PORT);
});
