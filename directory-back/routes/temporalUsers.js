const express = require('express');

const TemporalUserController = require('@controllers/TemporalUserController');
const temporalUserMiddleware = require('@middlewares/temporalUserMiddleware');
const sharedMiddleware = require('@middlewares/sharedMiddleware');

const api = express.Router();

api.post(
  '/companies/:companyId/temporalUsers',
  [
    temporalUserMiddleware.isUnique,
    sharedMiddleware.checkObjectIdValues,
  ],
  TemporalUserController.store
);

module.exports = api;
