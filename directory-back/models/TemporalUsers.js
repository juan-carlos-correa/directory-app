const mongoose = require('mongoose');
const pug = require('pug');
const bcrypt = require('@libs/crypt');
const string = require('@libs/string');
const config = require('@root/config');
const Mailer = require('@libs/Mailer');
const TokenVerification = require('@models/TokensVerification');

const Schema = mongoose.Schema;

const TemporalUsersSchema = Schema({
  firstname: {
    type: String,
    trim: true,
    maxlength: [30, 'El nombre debe contener máximo 30 caracteres'],
    minlength: [3, 'El nombre debe contener mínimo 3 caracteres'],
    required: [true, 'El nombre es obligatorio'],
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: [30, 'El apellido debe contener máximo 30 caracteres'],
    minlength: [3, 'El apellido debe contener mínimo 3 caracteres'],
    required: [true, 'El apellido es obligatorio'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    maxlength: [45, 'El email debe contener máximo 45 caracteres'],
    minlength: [4, 'El email debe contener mínimo 4 caracteres'],
    required: [true, 'El email es obligatorio'],
  },
  password: {
    type: String,
    select: false,
    maxlength: [75, 'La contraseña debe tener máximo 75 caracteres'],
    minlength: [6, 'La contraseña debe tener por lo menos 6 caracteres'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
    min: [0, 'El tipo de usuario debe ser un valor válido'],
    max: [1, 'El tipo de usuario debe ser un valor válido'],
  },
  company: {
    type: Schema.ObjectId,
    ref: 'companies',
  },
},
{
  timestamps: true,
});

/**
 * Schema Validators
 */
TemporalUsersSchema.path('email').validate(function (email) {
  let emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    throw new Error(`El email ${email} no es válido`);
  }
});

/**
 * Hash password
 */
TemporalUsersSchema.pre('save', async function (next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    let hash = await bcrypt.hashPassword(user.password);
    user.password = hash;
    return next();
  } catch (err) {
    next(err);
  }
});

/**
 * Firstname uppercase
 */
TemporalUsersSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('firstname')) {
    return next();
  }

  user.firstname = string.ucfirst(user.firstname);
  return next();
});

/**
 * Lastname uppercase
 */
TemporalUsersSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('lastname')) {
    return next();
  }

  user.lastname = string.ucfirst(user.lastname);
  return next();
});

TemporalUsersSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

/**
 * Send email verification account
 */
TemporalUsersSchema.post('save', async function (doc, next) {
  try {
    if (!this.wasNew) {
      return next();
    }

    await this.sendEmailVerification(doc);

    return next();
  } catch (e) {
    return next(e);
  }
});

TemporalUsersSchema.methods.sendEmailVerification = function (doc) {
  return new Promise(async (resolve, reject) => {
    try {
      const { _id, firstname, email } = doc;
      const { host, rootPath } = config.app;

      const token = await bcrypt.hashPassword(`${firstname}${email}${Date.now()}`);

      const tokenVerification = new TokenVerification({ temporalUser: _id, token });
      await tokenVerification.save();

      const mailer = new Mailer();

      const templatePath = `${rootPath}/resources/templates/verifyEmailTemplate.pug`;

      const html = pug.renderFile(templatePath, {
        name: firstname,
        url: `${host}/api/v1/tokenVerifications?token=${token}`,
      });

      const res = await mailer.sendEmail({
        to: email,
        subject: 'Bienvenido a Directory App - Valida tu cuenta',
        html,
      });

      return resolve(res);
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = mongoose.model('TemporalUsers', TemporalUsersSchema);
