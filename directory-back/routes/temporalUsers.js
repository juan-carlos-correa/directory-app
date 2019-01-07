const express = require('express');

const TemporalUserController = require('@controllers/TemporalUserController');
const temporalUserMiddleware = require('@middlewares/temporalUserMiddleware');
const sharedMiddleware = require('@middlewares/sharedMiddleware');
const authMiddleware = require('@middlewares/authMiddleware');

const { isUnique } = temporalUserMiddleware;
const { checkObjectIdValues } = sharedMiddleware;
const { isAdmin } = authMiddleware;

const api = express.Router();

api.post(
  '/companies/:id/temporalUsers',
  [isAdmin, checkObjectIdValues, isUnique],
  TemporalUserController.store
);

module.exports = api;
