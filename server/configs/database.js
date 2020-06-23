const mongoose = require('mongoose');

const database = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connnected to DB!');
  });

module.exports = database;
