const express = require('express');
const companyMiddleware = require('@middlewares/companyMiddleware');
const CompanyController = require('@controllers/CompanyController');

const api = express.Router();

api.post('/companies', companyMiddleware.validateSaveRequest, CompanyController.store);

module.exports = api;
