require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
const { PORT, MONGO_URL } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

// Temporary solution
app.use((req, res, next) => {
  req.user = {
    id: '658a50f5632cbd090cf81400',
  };

  next();
});

app.use(router);

app.listen(PORT);
