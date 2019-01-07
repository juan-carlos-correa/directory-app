const TemporalUsers = require('@models/TemporalUsers');

class TemporalUserController {
  static async store (req, res, next) {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
      } = req.body;

      const temporalUser = new TemporalUsers({
        email,
        password,
        firstname,
        lastname,
      });

      await temporalUser.save();
      return res.status(201).send({ success: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TemporalUserController;
