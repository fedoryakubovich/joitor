const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Params', () => {
  describe('Valid parameters', () => {
    it('Should return successfully response with status 200', (done) => {
      const userId = faker.random.uuid();
      const bookId = faker.random.uuid();

      request(server)
        .get(`/users/${userId}/books/${bookId}`)
        .expect(200, { userId, bookId }, done);
    });
  });

  describe('Invalid parameters', () => {
    it('Should return unsuccessful response with status 400', (done) => {
      const userId = faker.random.number();
      const bookId = faker.random.word();

      request(server)
        .get(`/users/${userId}/books/${bookId}`)
        .expect('Content-Type', /json/)
        .expect(
          400,
          {
            status: 400,
            statusText: 'Bad Request',
            errors: {
              params: {
                userId: '"userId" must be a valid GUID',
                bookId: '"bookId" must be a valid GUID',
              },
            },
          },
          done,
        );
    });
  });
});
