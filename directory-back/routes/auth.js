const express = require('express');

const authMiddleware = require('@middlewares/authMiddlewares');
const AuthController = require('@controllers/AuthController');

const api = express.Router();

api.post('/auth/login', authMiddleware.validateLoginRequest, AuthController.login);
api.post('/auth/sigin', authMiddleware.validateSigninRequest, AuthController.sigin);

module.exports = api;
