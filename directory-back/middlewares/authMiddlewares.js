const validateSigninRequest = (req, res, next) => {
  const {
    email,
    password,
    repeatPassword,
    firstname,
    lastname,
  } = req.body;

  const errors = {};

  if (!email) {
    errors.email = 'El email es requerido';
  }

  if (!password) {
    errors.password = 'La contraseña es requerida';
  }

  if (!repeatPassword) {
    errors.repeatPassword = 'La contraseña es requerida';
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

const validateLoginRequest = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  const errors = {};

  if (!email) {
    errors.email = 'El email es requerido';
  }

  if (!password) {
    errors.password = 'La contraseña es requerida';
  }

  if (password && password.length < 6) {
    errors.password = 'La contraseña debe contener por lo menos 6 caracteres';
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
  validateSigninRequest,
  validateLoginRequest,
};
