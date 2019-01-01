const express = require('express');
const AuthController = require('@controllers/AuthController');

const api = express.Router();

api.post('/auth/login', (req, res) => res.status(200).send({ msg: 'test' }));
api.post('/auth/sigin', AuthController.sigin);

module.exports = api;
