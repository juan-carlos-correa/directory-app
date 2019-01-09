const validateSaveTagRequest = (req, res, next) => {
  try {
    const { name, color, description } = req.body;
    const errors = {};

    if (!name) {
      errors.name = 'El nombre de la etiqueta es requerido';
    }

    if (!color) {
      errors.color = 'El color de la etiqueta es requerido';
    }

    if (description && description.length > 80) {
      errors.description = 'La descrición debe contener máximo 80 caracteres';
    }

    if (name && (name.length > 30 || name.length < 3)) {
      errors.name = 'El nombre debe contener entre 3 y 30 caracteres';
    }

    if (Object.keys(errors).length) {
      const err = new Error('Validations');
      err.httpStatus = 400;
      err.errors = errors;
      return next(err);
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validateSaveTagRequest,
};
