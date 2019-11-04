# joitor

Joitor is a middleware that helps validate `body`, `headers`, `cookies`, `params` and `query` in express application using [Joi](https://hapi.dev/family/joi/?v=16.1.7) validation.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)

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
const Joi = require('@hapi/joi');

module.exports = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(256).required(),
  },
};
```