const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');

const validations = require('./validations');
const validate = require('../lib');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);

app.post('/signup', validate(validations.signup), (req, res) => {
  res.status(200).json(req.body);
});
app.post(
  '/exist-signup',
  validate(validations.signup, { status: 409, statusText: 'Conflict' }),
  (req, res) => {
    res.status(200).json(req.body);
  },
);
app.post('/signin', validate(validations.signin), (req, res) => {
  res.status(200).json(req.body);
});
app.get('/users/:userId/books/:bookId', validate(validations.getUsersBook), (req, res) => {
  res.status(200).json(req.params);
});
app.get('/auth/ping', validate(validations.authPing), (req, res) => {
  res.status(200).json({ message: 'Pong' });
});
app.get('/clients', validate(validations.getClients), (req, res) => {
  res.status(200).json(req.query);
});
app.get('/session', validate(validations.session), (req, res) => {
  res.status(200).json(req.cookies);
});
app.put('/users/:userId', validate(validations.updateUser), (req, res) => {
  res.status(200).json({ body: req.body, params: req.params });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 400).json(err);
});

server.listen(3000, () => {
  /* eslint-disable no-console */
  console.log(`Server is running on http://localhost:3000`);
  /* eslint-disable no-console */
});

module.exports = app;
