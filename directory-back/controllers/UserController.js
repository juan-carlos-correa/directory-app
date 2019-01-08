const Users = require('@models/Users');

class UserController {
  static async update (req, res, next) {
    try {
      const { id } = req.params;

      const {
        email,
        firstname,
        lastname,
      } = req.body;

      const user = await Users.findById(id);

      user.email = email;
      user.firstname = firstname;
      user.lastname = lastname;

      await user.save();
      res.status(200).send({ user });
    } catch (e) {
      next(e);
    }
  }

  static async updatePassword (req, res, next) {
    try {
      const { id } = req.params;

      const { password } = req.body;

      const user = await Users.findById(id);
      user.password = password;

      await user.save();
      res.status(200).send({ success: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
