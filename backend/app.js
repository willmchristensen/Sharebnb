const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();
// morgan middleware
app.use(morgan('dev'));
// cookies (parsing) middleware
app.use(cookieParser());
// json (req handler) middleware
app.use(express.json());
// cors middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
// helmet middleware
app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
// _csrf token & create req.csrfToken method
app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );
// morgan middleware
// morgan middleware
// morgan middleware
