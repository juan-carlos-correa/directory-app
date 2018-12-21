const bcrypt = require('bcrypt');

async function hashPassword (password) {
  let hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword (candidatePass, pass) {
  let compare = await bcrypt.compare(candidatePass, pass);
  return compare;
}

module.exports = {
  hashPassword,
  comparePassword
};
