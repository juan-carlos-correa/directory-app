const env = require('node-env-file');

env(`${__dirname}/.env`);

const config = {
  app: {
    port: process.env.PORT_SERVER
  }
};

module.exports = config;
