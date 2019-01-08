const Users = require('@models/Users');

const isUnique = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ email });

  if (user) {
    const err = new Error('User exists');
    err.httpStatus = 400;
    err.errors = { email: 'El email ya se encuentra registrado en el sistema' };
    return next(err);
  }

  next();
};

const checkPermissions = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { id: paramId } = req.params;

    const user = await Users.findById(id);

    if (user.isAdmin || id === paramId) {
      return next();
    }

    const err = new Error('checkPermissions');
    err.httpStatus = 401;
    err.errors = { user: 'No tienes persmisos para modificar datos de otro usuario' };
    next(err);
  } catch (e) {
    next(e);
  }
};

const validateUpdateRequest = (req, res, next) => {
  const {
    email,
    firstname,
    lastname,
  } = req.body;

  const errors = {};

  if (!email) {
    errors.email = 'El email es requerido';
  }

  if (!firstname) {
    errors.firstname = 'El nombre es requerido';
  }

  if (!lastname) {
    errors.lastname = 'El apellido es requerido';
  }

  if (email && !validateEmail(email)) {
    errors.email = 'El email debe ser del tipo example@mail.com';
  }

  if (Object.keys(errors).length) {
    const err = new Error('Validations');
    err.httpStatus = 400;
    err.errors = errors;
    return next(err);
  }

  next();
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

module.exports = {
  isUnique,
  checkPermissions,
  validateUpdateRequest,
};
