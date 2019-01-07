const express = require('express');

const authMiddleware = require('@middlewares/authMiddleware');
const userMiddleware = require('@middlewares/userMiddleware');
const AuthController = require('@controllers/AuthController');

const api = express.Router();

api.post(
  '/auth/login',
  [
    authMiddleware.validateLoginRequest,
    userMiddleware.isUnique,
  ],
  AuthController.login);

api.post('/auth/sigin', authMiddleware.validateSigninRequest, AuthController.sigin);

module.exports = api;
