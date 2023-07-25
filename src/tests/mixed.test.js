const request = require('supertest');
const { faker } = require('@faker-js/faker');

const server = require('./server');

describe('Mixed', function () {
  describe('Valid request', function () {
    it('Should return successfully response with status 200', function (done) {
      const email = faker.internet.email();
      const userId = faker.string.uuid();

      request(server).put(`/users/${userId}`).send({ email }).expect(200, done);
    });
  });

  describe('Invalid request with empty payload', function () {
    it('Should return unsuccessful response with status 400', function (done) {
      const userId = faker.number.int();

      request(server)
        .put(`/users/${userId}`)
        .send({})
        .expect('Content-Type', /json/)
        .expect(
          400,
          {
            status: 400,
            statusText: 'Bad Request',
            errors: {
              body: {
                email: '"email" is required',
              },
              params: {
                userId: '"userId" must be a valid GUID',
              },
            },
          },
          done,
        );
    });
  });
});
