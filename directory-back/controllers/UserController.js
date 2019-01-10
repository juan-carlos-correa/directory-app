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

  static patch (req, res, next) {
    try {
      const { path, op } = req.body;

      if (path === 'password') {
        return UserController.updatePassword(req, res, next);
      }

      if (path === 'tags' && op === 'addTag') {
        return UserController.addTag(req, res, next);
      }

      if (path === 'tags' && op === 'removeTag') {
        return UserController.removeTag(req, res, next);
      }

      return res.status(204).send({});
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

  static async addTag (req, res, next) {
    try {
      const { id } = req.params;
      const { tagId } = req.body;

      const user = await Users.findById(id);
      user.tags.push(tagId);
      const userUpdated = await user.save();

      res.status(200).send({ userUpdated });
    } catch (e) {
      next(e);
    }
  }

  static async removeTag (req, res, next) {
    try {
      const { id } = req.params;
      const { tagId } = req.body;

      const user = await Users.findById(id);
      user.tags.pull(tagId);
      const userUpdated = await user.save();

      res.status(200).send({ userUpdated });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
