const express = require('express');

const TemporalUserController = require('@controllers/TemporalUserController');
const temporalUserMiddleware = require('@middlewares/temporalUserMiddleware');
const sharedMiddleware = require('@middlewares/sharedMiddleware');

const { isUnique } = temporalUserMiddleware;
const { checkObjectIdValues } = sharedMiddleware;

const api = express.Router();

api.post('/companies/:id/temporalUsers', [checkObjectIdValues, isUnique], TemporalUserController.store);

module.exports = api;
