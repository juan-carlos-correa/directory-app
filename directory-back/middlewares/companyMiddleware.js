const validateSaveRequest = (req, res, next) => {
  const { name } = req.body;
  const errors = {};

  if (!name) {
    errors.name = 'El nombre es requerido';
  }

  if (name && (name.length < 3 || name.length > 30)) {
    errors.name = 'El nombre debe ser entre 3 y 30 caracteres';
  }

  if (Object.keys(errors).length) {
    const err = new Error('Validations');
    err.httpStatus = 400;
    err.errors = errors;
    return next(err);
  }

  next();
};

const validateUserOwnerCompany = (req, res, next) => {
  const { id } = req.params;
  const { id: authId } = req.auth;

  if (id !== authId) {
    const err = new Error('Auth');
    err.httpStatus = 401;
    err.errors = { auth: 'No se permite consultar información de otros usuarios' };
    return next(err);
  }

  next();
};

module.exports = {
  validateSaveRequest,
  validateUserOwnerCompany,
};
