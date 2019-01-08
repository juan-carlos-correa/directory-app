const express = require('express');

const UserController = require('@controllers/UserController');
const userMiddleware = require('@middlewares/userMiddleware');

const api = express.Router();
const { checkPermissions, validateUpdateRequest } = userMiddleware;

api.put('/users/:id', [checkPermissions, validateUpdateRequest], UserController.update);

module.exports = api;
