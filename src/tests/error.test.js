const request = require('supertest');
const { faker } = require('@faker-js/faker');

const server = require('./server');

describe('Error', function () {
  describe('Change status to 404', function () {
    it('Should return unsuccessfully response with status 409', function (done) {
      const payload = {
        email: faker.internet.email(),
      };

      request(server)
        .post('/exist-signup')
        .send(payload)
        .expect(
          409,
          {
            status: 409,
            statusText: 'Conflict',
            errors: {
              body: {
                password: '"password" is required',
              },
            },
          },
          done,
        );
    });
  });
});
