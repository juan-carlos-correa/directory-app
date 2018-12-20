const env = require('node-env-file');

env(`${__dirname}/.env`);

const config = {
  app: {
    port: process.env.PORT_SERVER
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

module.exports = config;
