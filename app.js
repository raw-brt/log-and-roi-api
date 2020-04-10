require('dotenv').config();

// Import required dependencies
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const createError  = require('http-errors');

// Import config files
require('./config/db.config');
const session = require('./config/session.config');
const cors    = require('./config/cors.config');
const router  = require('./config/routes');

const app_name = require('./package.json').name;
const debug    = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Express configuration
const app = express();

// Middleware Setup
app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

// app.use(passportConfig);
app.use(bodyParser.json());
app.use('/', router);

app.use((req, _, next) => {
  req.currentUser = req.session.currentUser;
  next();
});

// Catch 4040 and forward to error handler
app.use((error, req, res, next) => {
  console.error('-' * 1000);
  console.error(error);
  req.status(error.status || 500);

  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);

    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message;
    }

    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found');
  }

  data.message = error.message;
  res.json(data);
});

// Normalize a port into a number, string or false
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Listen on provided port
const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => console.log(`Listening on port ${port}`));

// default value for title local
app.locals.title = 'Log and ROI';

module.exports = app;
