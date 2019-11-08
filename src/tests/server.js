const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');

const validations = require('./validations');
const validate = require('../lib');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);

app.post('/signup', validate(validations.signup), (req, res) => {
  res.status(200).send();
});
app.post('/signin', validate(validations.signin), (req, res) => {
  res.status(200).send();
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

server.listen(3000, () => {
  /* eslint-disable no-console */
  console.log(`Server is running on http://localhost:3000`);
  /* eslint-disable no-console */
});

module.exports = app;
