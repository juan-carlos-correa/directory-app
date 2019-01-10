const express = require('express');

const UserController = require('@controllers/UserController');
const userMiddleware = require('@middlewares/userMiddleware');

const api = express.Router();
const {
  checkPermissions,
  validateUpdateRequest,
  validatePatchRequest,
} = userMiddleware;

const allowAdminUpdateUsers = true;
const allowAdminPatchUsers = false;

const checkPermUpdateUsers = checkPermissions(allowAdminUpdateUsers);
const checkPermPatchUsers = checkPermissions(allowAdminPatchUsers);

api.put('/users/:id', [checkPermUpdateUsers, validateUpdateRequest], UserController.update);
api.patch('/users/:id', [checkPermPatchUsers, validatePatchRequest], UserController.patch);

module.exports = api;
