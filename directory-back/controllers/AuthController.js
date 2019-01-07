const User = require('@models/Users');
const TemporalUser = require('@models/TemporalUsers');

class AuthController {
  static async sigin (req, res, next) {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
      } = req.body;

      const temporalUser = new TemporalUser({
        password,
        firstname,
        lastname,
        email,
        isAdmin: true,
      });

      await temporalUser.save();
      return res.status(201).send({ success: true });
    } catch (e) {
      e.httpStatus = 400;
      next(e);
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body;

      const temporalUser = await TemporalUser.findOne({ email });

      if (temporalUser) {
        temporalUser.sendEmailVerification(temporalUser);
        const err = new Error('temporalUser');
        err.errors = {
          login: 'Necesitas validar tu email. Reenviamos un nuevo correo para confirmar tu cuenta',
        };
        err.httpStatus = 400;
        return next(err);
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        const err = new Error('user');
        err.errors = { login: 'El usuario no fue encontrado' };
        err.httpStatus = 400;
        return next(err);
      }

      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        const err = new Error('password');
        err.errors = { login: 'La contraseña es inválida' };
        err.httpStatus = 400;
        return next(err);
      }

      const token = await user.getToken();

      return res.status(200).send({ token });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;
