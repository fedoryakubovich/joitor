const request = require('supertest');
const { faker } = require('@faker-js/faker');

const server = require('./server');

describe('Cookies', function () {
  describe('Valid cookies parameters', function () {
    it('Should return successfully response with status 200', function (done) {
      const sessionId = faker.string.uuid();

      request(server).get(`/session`).set('Cookie', `sessionId=${sessionId}`).expect(200, done);
    });
  });

  describe('Invalid query parameters', function () {
    it('Should return unsuccessful response with status 400', function (done) {
      const sessionId = faker.number.int();

      request(server)
        .get(`/session`)
        .set('Cookie', `sessionId=${sessionId}`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
