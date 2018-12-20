const db = require('./mongo');

async function connect (config = {}, params = {}) {
  params.useNewUrlParser = true

  let uri = `mongodb://${config.host}:${config.port}/${config.database}`;

  if (config.user) {
    uri = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }

  try {
    await db.connect(uri, params);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = connect
