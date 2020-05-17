const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Body', function () {
  describe('Valid request', function () {
    it('Should return successfully response with status 200', function (done) {
      const payload = {
        email: faker.internet.email(),
        password: faker.internet.password(16),
      };

      request(server).post('/signup').send(payload).expect(200, done);
    });
  });

  describe('Invalid request with empty payload', function () {
    it('Should return unsuccessful response with status 400', function (done) {
      const payload = {};

      request(server)
        .post('/signup')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(
          400,
          {
            status: 400,
            statusText: 'Bad Request',
            errors: {
              body: {
                email: '"email" is required',
                password: '"password" is required',
              },
            },
          },
          done,
        );
    });
  });
});
