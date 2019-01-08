const express = require('express');
const companyMiddleware = require('@middlewares/companyMiddleware');
const sharedMiddleware = require('@middlewares/sharedMiddleware');
const CompanyController = require('@controllers/CompanyController');
const authMiddleware = require('@middlewares/authMiddleware');

const { validateSaveRequest, validateUserOwnerCompany } = companyMiddleware;
const { checkObjectIdValues } = sharedMiddleware;
const { isAdmin } = authMiddleware;

const api = express.Router();

api.post('/companies', [isAdmin, validateSaveRequest], CompanyController.store);
api.get(
  '/users/:id/companies',
  [isAdmin, checkObjectIdValues, validateUserOwnerCompany],
  CompanyController.findCompaniesUser
);
api.get('/companies/:id/users', checkObjectIdValues, CompanyController.findUsersOfCompany);

module.exports = api;
