const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Headers', () => {
  describe('Valid headers', () => {
    it('Should return successfully response with status 200', (done) => {
      const token = faker.random.uuid();

      request(server)
        .get('/auth/ping')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, { message: 'Pong' }, done);
    });
  });

  describe('Invalid headers', () => {
    it('Should return successfully response with status 200', (done) => {
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
