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

  it('gets a list of party favors with GET', async () => {

    const favors = await Promise.all([
      Favor.insert({ favor: 'paper plates', quantity: 10, contributor: 'joe' }),
      Favor.insert({ favor: 'plastic cups', quantity: 50, contributor: 'clara' }),
      Favor.insert({ favor: 'ice', quantity: 2, contributor: 'carl' }),
    ])

    return request(app)
      .get('/api/v1/favors')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining(favors));
      });
  });


  it('gets a favor by id', async () => {
    const res = await request(app)
    .get('/api/v1/favors/1');
    expect(res.body).toEqual({
      id: '1',
      favor: 'paper plates',
      quantity: 10,
      contributor: 'joe'
    })
  })
});
