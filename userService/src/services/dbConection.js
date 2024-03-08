const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_CONNECTION = process.env.MONGODB_URI;

mongoose.connect(MONGO_CONNECTION)
  .then(() => console.log('Conexión establecida'))
  .catch(() => console.error('Error al conectar'));

module.exports = mongoose;
