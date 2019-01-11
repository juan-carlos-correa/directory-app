const mongoose = require('mongoose');
const Users = require('@models/Users');

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

TagsSchema.post('remove', async function (doc, next) {
  try {
    const { _id } = doc;
    const usersWithTagRemoved = await Users.find({ tags: { $in: [_id] } });

    if (!usersWithTagRemoved.length) {
      return next();
    }

    for (let i = 0; i < usersWithTagRemoved.length; i += 1) {
      usersWithTagRemoved[i].tags.pull(_id);
      await usersWithTagRemoved[i].save();
    }

    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model('Tags', TagsSchema);
