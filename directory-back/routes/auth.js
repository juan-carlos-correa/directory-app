const express = require('express');

const authMiddleware = require('@middlewares/authMiddleware');
const userMiddleware = require('@middlewares/userMiddleware');
const AuthController = require('@controllers/AuthController');

const api = express.Router();

const { validateLoginRequest, validateSigninRequest } = authMiddleware;
const { isUnique } = userMiddleware;

api.post('/auth/login', validateLoginRequest, AuthController.login);
api.post('/auth/sigin', [validateSigninRequest, isUnique], AuthController.sigin);

module.exports = api;
