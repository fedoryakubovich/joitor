const request = require('supertest');
const faker = require('faker');

const server = require('./server');

describe('Cookies', () => {
  describe('Valid cookies parameters', () => {
    it('Should return successfully response with status 200', (done) => {
      const sessionId = faker.random.uuid();

      request(server)
        .get(`/session`)
        .set('Cookie', `sessionId=${sessionId}`)
        .expect(200, done);
    });
  });

  describe('Invalid query parameters', () => {
    it('Should return unsuccessful response with status 400', (done) => {
      const sessionId = faker.random.number();

      request(server)
        .get(`/session`)
        .set('Cookie', `sessionId=${sessionId}`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
