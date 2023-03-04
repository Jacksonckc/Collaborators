const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery', false);

module.exports = class Database {
  init = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully to MongoBD');
  };
};
