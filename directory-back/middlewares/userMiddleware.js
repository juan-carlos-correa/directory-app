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

const checkPermissions = (allowAdmin = false) => async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { id: paramId } = req.params;

    const user = await Users.findById(id);

    if ((allowAdmin && user.isAdmin) || id === paramId) {
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

const validateUpdatePasswordRequest = (req, res, next) => {
  const {
    password,
    repeatPassword,
  } = req.body;

  const errors = {};

  if (!password) {
    errors.password = 'La contraseña es requerida';
  }

  if (!repeatPassword) {
    errors.repeatPassword = 'La contraseña es requerida';
  }

  if (password && repeatPassword && (password !== repeatPassword)) {
    const message = 'Las contraseñas deben ser iguales';
    errors.password = message;
    errors.repeatPassword = message;
  }

  if (password && password.length < 6) {
    errors.password = 'La contraseña debe contener por lo menos 6 caracteres';
  }

  if (repeatPassword && repeatPassword.length < 6) {
    errors.repeatPassword = 'La contraseña debe contener por lo menos 6 caracteres';
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
  validateUpdatePasswordRequest,
};
