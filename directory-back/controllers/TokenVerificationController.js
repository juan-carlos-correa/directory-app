const request = require('request');
const TokenVerification = require('@models/TokensVerification');
const User = require('@models/Users');
const TemporalUser = require('@models/TemporalUsers');
const config = require('@root/config');

class TokenVerificationController {
  static async find (req, res, next) {
    const { token } = req.query;

    const tokenVerification = await TokenVerification
      .findOne({ token })
      .populate('temporalUser')
      .exec();

    if (!tokenVerification) {
      const err = new Error('token not found');
      err.httpStatus = 400;
      err.errors = { token: 'Token inválido' };
      return next(err);
    }

    const { host } = config.app;
    const { _id } = tokenVerification.temporalUser;

    request({
      method: 'PUT',
      uri: `${host}/api/v1/temporalUsers/${_id}/tokenVerifications`,
    }, (error, response) => {
      if (error) {
        const err = new Error('updateVerificationUser');
        err.httpStatus = 400;
        err.errors = { token: 'Error al procesar la validación' };
        return next(err);
      }

      if (response.statusCode === 200) {
        return res.status(200).send({ success: true });
      }

      return res.status(500).send({ success: false });
    });
  }

  static async updateVerificationUser (req, res, next) {
    try {
      const { userId } = req.params;

      const temporalUser = await TemporalUser.findById(userId).select('+password');

      if (!temporalUser) {
        const err = new Error('user not found');
        err.httpStatus = 400;
        err.errors = { user: 'Usuario no encontrado' };
        return next(err);
      }

      const {
        firstname,
        lastname,
        email,
        password,
        isAdmin,
      } = temporalUser;

      const user = new User({
        firstname,
        lastname,
        email,
        password,
        isAdmin,
        isActive: true,
      });

      user.isActive = true;
      await user.save();
      await temporalUser.remove();
      await TokenVerification.deleteMany({ email });

      return res.status(200).send({ success: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TokenVerificationController;
