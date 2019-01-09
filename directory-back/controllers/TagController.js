const Tag = require('@models/Tags');

class TagController {
  static async store (req, res, next) {
    try {
      const { name, color, description } = req.body;
      const { companyId } = req.params;

      const tag = new Tag({ name, color, description, company: companyId });
      const tagStored = await tag.save();
      res.status(201).send({ tagStored });
    } catch (e) {
      next(e);
    }
  }

  static async findCompanyTags (req, res, next) {
    try {
      const { companyId } = req.params;

      const companyTags = await Tag.find({ company: companyId });
      res.status(200).send({ companyTags });
    } catch (e) {
      next(e);
    }
  }

  static async update (req, res, next) {
    try {
      const { name, color, description } = req.body;
      const { id, companyId } = req.params;

      const tag = await Tag.findOne({ _id: id, company: companyId });

      if (!tag) {
        const err = new Error('updateTag');
        err.httpStatus = 400;
        err.errors = { tagUpdated: 'No se encontró la etiqueta' };
        return next(err);
      }

      tag.name = name;
      tag.color = color;
      tag.description = description;

      const tagUpdated = await tag.save();
      res.status(200).send({ tagUpdated });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TagController;
