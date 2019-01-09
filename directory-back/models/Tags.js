const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = Schema({
  company: {
    type: Schema.ObjectId,
    ref: 'companies',
  },
  name: {
    type: String,
    trim: true,
    maxlength: [30, 'El nombre debe contener máximo 30 caracteres'],
    minlength: [3, 'El nombre debe contener mínimo 3 caracteres'],
    required: [true, 'El nombre es obligatorio']
  },
  color: {
    type: String,
    trim: true,
    maxlength: [30, 'El nombre del color debe contener máximo 30 caracteres'],
    minlength: [3, 'El nombre del color debe contener mínimo 3 caracteres'],
    required: [true, 'El nombre del color es obligatorio']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [80, 'La descripión debe contener máximo 80 caracteres'],
    required: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tags', TagsSchema);
