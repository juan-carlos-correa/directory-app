const TemporalUsers = require('@models/TemporalUsers');

const isUnique = async (req, res, next) => {
  const { email } = req.body;

  const user = await TemporalUsers.findOne({ email });

  if (user) {
    const err = new Error('Temporal user exists');
    err.httpStatus = 400;
    err.errors = { email: 'El email ya se encuentra registrado en el sistema' };
    return next(err);
  }

  next();
};

module.exports = {
  isUnique,
};
