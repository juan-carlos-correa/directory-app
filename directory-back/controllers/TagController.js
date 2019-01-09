const Tag = require('@models/Tags');

class TagController {
  static async store (req, res, next) {
    try {
      const { name, color, description } = req.body;
      const { id } = req.params;

      const tag = new Tag({ name, color, description, company: id });
      const tagStored = await tag.save();
      res.status(201).send({ tagStored });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TagController;
