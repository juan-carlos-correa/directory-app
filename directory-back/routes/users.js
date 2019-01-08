const express = require('express');

const UserController = require('@controllers/UserController');
const userMiddleware = require('@middlewares/userMiddleware');

const api = express.Router();
const {
  checkPermissions,
  validateUpdateRequest,
  validateUpdatePasswordRequest,
} = userMiddleware;

const allowAdminUpdateUsers = true;
const allowAdminUpdatePasswordUsers = false;

const checkPermUpdateUsers = checkPermissions(allowAdminUpdateUsers);
const checkPermUpdatePasswUsers = checkPermissions(allowAdminUpdatePasswordUsers);

api.put('/users/:id', [checkPermUpdateUsers, validateUpdateRequest], UserController.update);
api.patch('/users/:id', [checkPermUpdatePasswUsers, validateUpdatePasswordRequest], UserController.updatePassword);

module.exports = api;
