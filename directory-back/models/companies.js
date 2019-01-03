const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const string = require('@libs/string');

const Schema = mongoose.Schema;

const CompaniesSchema = Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    maxlength: [30, 'El nombre debe contener máximo 30 caracteres'],
    minlength: [3, 'El nombre debe contener mínimo 3 caracteres'],
    required: [true, 'El nombre es obligatorio']
  },
}, {
  timestamps: true,
});

/**
 * Custom unique validator errors
 */
CompaniesSchema.plugin(uniqueValidator, { message: 'Error, el valor {PATH} debe ser único' });

/**
 * Name uppercase
 */
CompaniesSchema.pre('save', function (next) {
  let company = this;

  if (!company.isModified('name')) {
    return next();
  }

  company.name = string.ucfirst(company.name);
  return next();
});

module.exports = mongoose.model('Companies', CompaniesSchema);
