const express = require('express');
const bodyParser = require('body-parser');

const handleErrors = require('@middlewares/handleErrors');
const authMiddleware = require('@middlewares/authMiddleware');
const authRoutes = require('@routes/auth');
const companiesRoutes = require('@routes/companies');

const app = express();
const version = '/api/v1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Add routes
 */
app.use(version, authRoutes);

/*
 * Group this routes with auth middlewares
 */
app.use(authMiddleware.isAuth);

app.use(version, companiesRoutes);

/*
 * Handle errors in the last position of middlewares
 */
app.use(handleErrors);

module.exports = app;
