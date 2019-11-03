const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Mixed', () => {
  describe('Valid request', () => {
    it('Should return successfully response with status 200', (done) => {
      const email = faker.internet.email();
      const userId = faker.random.uuid();

      request(server)
        .put(`/users/${userId}`)
        .send({ email })
        .expect(200, done);
    });
  });

  describe('Invalid request with empty payload', () => {
    it('Should return unsuccessful response with status 400', (done) => {
      const userId = faker.random.number();

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
