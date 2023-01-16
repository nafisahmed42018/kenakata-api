const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection successful'))
  .catch(err => console.log(err));

const app = express();

app.get('/test', (req, res) => res.send('Testing World!'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT || 3001, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
