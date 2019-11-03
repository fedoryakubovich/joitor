const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Query', function() {
  describe('Valid query parameters', function() {
    it('Should return successfully response with status 200', function(done) {
      const email = faker.internet.email();
      const username = faker.internet.userName();

      request(server)
        .get(`/clients`)
        .query({ email, username })
        .expect(200, { email, username }, done);
    });
  });

  describe('Invalid query parameters', function() {
    it('Should return unsuccessful response with status 400', function(done) {
      const email = faker.random.number();

      request(server)
        .get(`/clients`)
        .query({ email })
        .expect('Content-Type', /json/)
        .expect(
          400,
          {
            status: 400,
            statusText: 'Bad Request',
            errors: {
              query: {
                username: '"username" is required',
                email: '"email" must be a valid email',
              },
            },
          },
          done,
        );
    });
  });
});
