const express = require('express');
const CompanyController = require('@controllers/CompanyController');

const api = express.Router();

api.post('/companies', CompanyController.store);

module.exports = api;
