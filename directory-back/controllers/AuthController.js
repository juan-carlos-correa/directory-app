const User = require('@models/users');

class AuthController {
  static async sigin (req, res) {
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
      });

      const userStored = await user.save();
      return res.status(201).send({ userStored });
    } catch (e) {
      return res.status(500).send({ errorMsg: e.message });
    }
  }
}

module.exports = AuthController;
