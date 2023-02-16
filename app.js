/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
require('dotenv').config();

const userRouters = require('./src/routes/user.route');
const sessionRouters = require('./src/routes/session.route');
const symptomsRouters = require('./src/routes/symptoms.route');
const hospitalsRouters = require('./src/routes/hospitals.route');

require('./src/models/db');
require('./src/auth/auth');

const app = express();
const port = process.env.PORT || 8000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    // eslint-disable-next-line comma-dangle
  })
);
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(errors());

app.set('views', path.join(__dirname, './src/views'));

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  // partialsDir: ['src/views/partials/'],
  helpers: {
    // eslint-disable-next-line eqeqeq
    isEqual: (number1, number2) => number1 == number2,
    decrement: (page) => (page <= 1 ? 1 : Number(page) - 1),
    increment: (page, limit) => (page >= limit ? limit : Number(page) + 1),
  },
});

app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/', sessionRouters);
app.use('/api/user', userRouters);
app.use('/api/symptoms', symptomsRouters);
app.use('/api/hospitals', hospitalsRouters);

/* Error handler middleware */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
