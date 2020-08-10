const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Town = require('../lib/models/Town');

describe('Town routes', () => {

  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('creates a town via post route', () => {
    return request(app)
      .post('/api/v1/towns')
      .send({
        name: 'My town',
        food: 1,
        law: 1,
        population: 1,
        production: 1,
        traffic: 1,
        location: 'mine'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'My town',
          food: 1,
          law: 1,
          population: 1,
          production: 1,
          traffic: 1,
          location: 'mine',
          __v: 0
        });
      });
  });
});
