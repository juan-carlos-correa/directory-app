const express = require('express');
const TokenVerificationController = require('@controllers/TokenVerificationController');
const sharedMiddleware = require('@middlewares/sharedMiddleware');

const { checkObjectIdValues } = sharedMiddleware;

const api = express.Router();

api.get('/tokenVerifications', TokenVerificationController.find);
api.put(
  '/temporalUsers/:userId/tokenVerifications',
  checkObjectIdValues,
  TokenVerificationController.updateVerificationUser
);

module.exports = api;
