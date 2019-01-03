const express = require('express');

const authMiddleware = require('@middlewares/authMiddlewares');
const AuthController = require('@controllers/AuthController');

const api = express.Router();

api.post('/auth/login', (req, res) => res.status(200).send({ msg: 'test' }));
api.post('/auth/sigin', authMiddleware.validateSignin, AuthController.sigin);

module.exports = api;
