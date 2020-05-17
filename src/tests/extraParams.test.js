const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Extra Parameters', function () {
  describe('Invalid request with extra parameters', function () {
    it('Should return unsuccessful response with status 400', function (done) {
      const payload = {
        email: faker.internet.email(),
        password: faker.internet.password(16),
        username: faker.internet.userName(),
      };

      request(server).post('/signin').send(payload).expect(200, done);
    });
  });
});
