const express = require('express');
const bodyParser = require('body-parser');

const handleErrors = require('@middlewares/handleErrors');
const authRoutes = require('@routes/auth');

const app = express();
const version = '/api/v1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(version, authRoutes);

app.use(handleErrors);

module.exports = app;
