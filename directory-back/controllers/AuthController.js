const User = require('@models/Users');

class AuthController {
  static async sigin (req, res, next) {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
      } = req.body;

      const user = new User({
        password,
        firstname,
        lastname,
        email,
        isAdmin: true,
      });

      await user.save();
      return res.status(201).send({ success: true });
    } catch (e) {
      e.httpStatus = 400;
      next(e);
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        const err = new Error('email');
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
