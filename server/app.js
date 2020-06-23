require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('./configs/database');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
