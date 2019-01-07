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

module.exports = {
  isUnique,
};
