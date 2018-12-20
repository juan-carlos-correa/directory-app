const mongoose = require('mongoose');

const db = mongoose.connection;

db.once('open', () => console.log('DB connected'));

module.exports = mongoose;
