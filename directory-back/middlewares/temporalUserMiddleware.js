const TemporalUsers = require('@models/TemporalUsers');
const User = require('@models/Users');

const isUnique = async (req, res, next) => {
  const { email } = req.body;

  const temporalUser = await TemporalUsers.findOne({ email });
  const user = await User.findOne({ email });

  if (temporalUser || user) {
    const err = new Error('userExists');
    err.httpStatus = 400;
    err.errors = { email: 'El email ya se encuentra registrado en el sistema' };
    return next(err);
  }

  next();
};

module.exports = {
  isUnique,
};
