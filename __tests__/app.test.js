const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Party Favor routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a party favor  with POST', () => {
    return request(app)
    .post('/api/v1/favors')
    .send({ favor: 'paper plates', quantity: 10, contributor: 'joe' })
    .then((res) => {
      expect(res.body).toEqual({
        id: expect.any(String),
        favor: 'paper plates',
        quantity: 10,
        contributor: 'joe'
      });
    });
  })
});
