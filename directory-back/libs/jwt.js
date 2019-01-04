const jwt = require('jsonwebtoken');
const bearer = require('token-extractor');

const encode = (payload, secret, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }

      resolve(token);
    });
  });
};

const decode = (token, secret, options) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};

const extractToken = (req) => {
  return new Promise((resolve, reject) => {
    bearer(req, (err, token) => {
      if (err) {
        const customErr = new Error('TokenExtractor');
        customErr.httpStatus = 401;
        customErr.errors = {
          auth: 'No se encontró la cabecera de autorización',
        };
        return reject(customErr);
      }

      resolve(token);
    });
  });
};

module.exports = {
  encode,
  decode,
  extractToken,
};
