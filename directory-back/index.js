require('module-alias/register');

const app = require('./app');
const config = require('./config');
const connect = require('@db');

const port = config.app.port;

app.listen(port, () => {
  console.log(`server mounted in port ${port}`);
  connect(config.db);
});
