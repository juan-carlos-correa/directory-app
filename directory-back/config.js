const env = require('node-env-file');
const path = require('path');

const rootPath = path.resolve(__dirname);

env(`${__dirname}/.env`);

const config = {
  app: {
    host: process.env.HOST_SERVER,
    port: process.env.PORT_SERVER,
    secret: process.env.JWT_SECRET,
    rootPath,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  mail: {
    service: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    fromDefault: process.env.MAIL_FROM_EMAIL,
  }
};

module.exports = config;
