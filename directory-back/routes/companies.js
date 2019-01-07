const express = require('express');
const companyMiddleware = require('@middlewares/companyMiddleware');
const sharedMiddleware = require('@middlewares/sharedMiddleware');
const CompanyController = require('@controllers/CompanyController');

const { validateSaveRequest, validateUserOwnerCompany } = companyMiddleware;
const { checkObjectIdValues } = sharedMiddleware;

const api = express.Router();

api.post('/companies', validateSaveRequest, CompanyController.store);
api.get(
  '/users/:id/companies',
  [checkObjectIdValues, validateUserOwnerCompany],
  CompanyController.findCompaniesUser
);

module.exports = api;
