const jwt = require('jsonwebtoken');

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

module.exports = {
  encode,
};
