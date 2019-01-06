const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenVerificationSchema = Schema({
  temporalUser: {
    type: Schema.ObjectId,
    ref: 'TemporalUsers',
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('TokensVerification', TokenVerificationSchema);
