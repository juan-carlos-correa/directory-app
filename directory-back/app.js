const express = require('express');
const bodyParser = require('body-parser');

const handleErrors = require('@middlewares/handleErrors');
const authMiddleware = require('@middlewares/authMiddleware');
const authRoutes = require('@routes/auth');
const companiesRoutes = require('@routes/companies');
const tokenVerificationsRoutes = require('@routes/tokenVerifications');
const tagsRoutes = require('@routes/tags');
const temporalUsersRoutes = require('@routes/temporalUsers');
const userRoutes = require('@routes/users');

const app = express();
const version = '/api/v1';

const { isAuth, isUserActive } = authMiddleware;

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
app.use(isAuth);
app.use(isUserActive);

app.use(version, companiesRoutes);
app.use(version, temporalUsersRoutes);
app.use(version, userRoutes);
app.use(version, tagsRoutes);

/*
 * Handle errors in the last position of middlewares
 */
app.use(handleErrors);

module.exports = app;
