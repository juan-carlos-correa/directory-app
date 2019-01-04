const express = require('express');

const api = express.Router();

api.post('/companies', (req, res) => res.status(200).send({ test: 'test' }));

module.exports = api;
