const express = require('express');
const TokenVerificationController = require('@controllers/TokenVerificationController');
const api = express.Router();

api.get('/tokenVerifications', TokenVerificationController.find);
api.put('/temporalUsers/:userId/tokenVerifications', TokenVerificationController.updateVerificationUser);

module.exports = api;
