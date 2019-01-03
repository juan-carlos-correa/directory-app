const hanldeErrors = (err, req, res, next) => {
  if (!err.errors) {
    return next(err);
  }

  const keys = Object.keys(err.errors);
  const values = Object.values(err.errors);
  const status = err.httpStatus;
  const response = { errors: {} };

  for (let i = 0; i < keys.length; i += 1) {
    response.errors[keys[i]] = values[i];
  }

  return res.status(status).send(response);
};

module.exports = hanldeErrors;
