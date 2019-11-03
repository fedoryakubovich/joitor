const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Headers', function() {
  describe('Valid headers', function() {
    it('Should return successfully response with status 200', function(done) {
      const token = faker.random.uuid();

      request(server)
        .get('/auth/ping')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, { message: 'Pong' }, done);
    });
  });

  describe('Invalid headers', function() {
    it('Should return successfully response with status 200', function(done) {
      request(server)
        .get('/auth/ping')
        .expect('Content-Type', /json/)
        .expect(
          400,
          {
            status: 400,
            statusText: 'Bad Request',
            errors: {
              headers: {
                authorization: '"authorization" is required',
              },
            },
          },
          done,
        );
    });
  });
});
