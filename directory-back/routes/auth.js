const express = require('express');

const api = express.Router();

api.post('/auth/login', (req, res) => res.status(200).send({ msg: 'test' }));
api.post('/auth/sigin', (req, res) => res.status(200).send({ msg: 'test' }));

module.exports = api;
