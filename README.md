# Joitor &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/fedoryakubovich/joitor/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/joitor.svg?style=flat)](https://www.npmjs.com/package/joitor) [![Build Status](https://img.shields.io/travis/com/fedoryakubovich/joitor/master.svg?style=flat)](https://travis-ci.com/fedoryakubovich/joitor) [![NPM downloads](https://img.shields.io/npm/dm/joitor.svg?style=flat)](https://npmcharts.com/compare/joitor?minimal=true)[![Coverage Status](https://coveralls.io/repos/fedoryakubovich/joitor/badge.svg?branch=master)](https://coveralls.io/github/fedoryakubovich/joitor?branch=master)

Joitor is a middleware that helps validate `body`, `headers`, `cookies`, `params` and `query` in express application using [Joi](https://hapi.dev/family/joi/?v=16.1.7) validation.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Options](#options)
- [Tests](#tests)
- [Errors](#errors)

## Installation

`npm install joitor`

## Features

- body
- cookies
- headers
- query
- params

## Usage

```js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const validate = require('joitor');
const Joi = require('@hapi/joi');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const signupValidation = {
  body: {
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(6)
      .max(256)
      .required(),
  },
};

app.post('/signup', validate(signupValidation), (req, res) => res.status(200).send());

const server = http.createServer(app);
server.listen(3000, () => console.log(`Server is running on http://localhost:3000`));

module.exports = app;
```

## Options

By default, Joi don't allow object to contain unknown keys which, they are ignored.
If an object can contain unknown keys, pass the following keys: `allowUnknown: true`. See an example below:

```js
const signupValidation = {
  body: {
    allowUnknown: true,

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(6)
      .max(256)
      .required(),
  },
};
```

## Tests

```
npm install
npm test
```

## Errors

### Custom error status

By default, Joitor returns `400` error status and `Bad Request` text. If you want to change them you can pass the second argument to the `validate` function, For example:

```js
// some code

app.post(
  '/signup',
  validate(signupValidation, { status: 409, statusText: 'Conflict' }),
  (req, res) => res.status(200).send(),
);

// some code
```

### Custom handler

Joitor provides his own type of error. With it you can manually handle the error. For example:

```js
// some code

const validate = require('joitor');

// some code

app.use(function(err, req, res, next) {
  if (err instanceof validate.JoitorError) {
    // handler for the error
    return res.status(err.status || 400).json(err);
  }

  res.status(500).send();
});
```

### Examples of errors

```js
{
  status: 400,
  statusText: 'Bad Request',
  errors: {
    body: {
      email: '"email" is required',
      password: '"password" is required'
    }
  }
}
```
