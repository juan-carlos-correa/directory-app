const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenVerificationSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'users',
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('tokenVerification', TokenVerificationSchema);
