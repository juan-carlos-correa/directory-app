const express = require('express');

const tagMiddleware = require('@middlewares/tagMiddleware');
const sharedMiddleware = require('@middlewares/sharedMiddleware');
const TagController = require('@controllers/TagController');

const { validateSaveTagRequest } = tagMiddleware;
const { companyExists, checkObjectIdValues } = sharedMiddleware;

const api = express.Router();

api.post('/companies/:companyId/tags', [checkObjectIdValues, companyExists, validateSaveTagRequest], TagController.store);
api.get('/companies/:companyId/tags', [checkObjectIdValues, companyExists], TagController.findCompanyTags);

module.exports = api;
