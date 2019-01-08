const express = require('express');
const bodyParser = require('body-parser');

const handleErrors = require('@middlewares/handleErrors');
const authMiddleware = require('@middlewares/authMiddleware');
const authRoutes = require('@routes/auth');
const companiesRoutes = require('@routes/companies');
const tokenVerificationsRoutes = require('@routes/tokenVerifications');
const temporalUsersRoutes = require('@routes/temporalUsers');
const userRoutes = require('@routes/users');

const app = express();
const version = '/api/v1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Add routes without auth middleware
 */
app.use(version, authRoutes);
app.use(version, tokenVerificationsRoutes);

/*
 * Group this routes with auth middlewares
 */
app.use(authMiddleware.isAuth);
app.use(authMiddleware.isUserActive);

app.use(version, companiesRoutes);
app.use(version, temporalUsersRoutes);
app.use(version, userRoutes);

/*
 * Handle errors in the last position of middlewares
 */
app.use(handleErrors);

module.exports = app;
