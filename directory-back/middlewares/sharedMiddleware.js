const mongoose = require('mongoose');
const Company = require('@models/Companies');

const checkObjectIdValues = (req, res, next) => {
  const { params } = req;

  const values = Object.values(params);
  const keys = Object.keys(params);

  const errors = {};

  if (!keys.length) {
    return next();
  }

  for (let i = 0; i < values.length; i += 1) {
    const objectId = values[i];

    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      const propName = keys[i];
      errors[propName] = 'El valor es inválido';
    }
  }

  if (Object.keys(errors).length) {
    const err = new Error('checkObjectIdValues');
    err.httpStatus = 400;
    err.errors = errors;
    return next(err);
  }

  next();
};

const companyExists = async (req, res, next) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      const err = new Error('companyExists');
      err.httpStatus = 400;
      err.errors = { company: 'La compañía no existe' };
      return next(err);
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkObjectIdValues,
  companyExists,
};
