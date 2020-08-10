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

  it('gets all town via GET route', () => {
    return Town.create({
      name: 'My town',
      food: 1,
      law: 1,
      population: 1,
      production: 1,
      traffic: 1,
      location: 'mine',
    })
      .then(() => request(app).get('/api/v1/towns'))
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.anything(),
          name: 'My town',
          food: 1,
          law: 1,
          population: 1,
          production: 1,
          traffic: 1,
          location: 'mine',
          __v: 0
        }]);
      });
  });

  it('updates a town with PATCH route', () => {
    return Town.create({
      name: 'My town',
      food: 1,
      law: 1,
      population: 1,
      production: 1,
      traffic: 1,
      location: 'mine',
    })
      .then(town => {
        return request(app)
          .patch(`/api/v1/towns/${town._id}`)
          .send({ population: 2, production: 3 });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'My town',
          food: 1,
          law: 1,
          population: 2,
          production: 3,
          traffic: 1,
          location: 'mine',
          __v: 0
        });
      });
  });

  it('deletes a town via delete route', () => {
    return Town.create({
      name: 'My town',
      food: 1,
      law: 1,
      population: 1,
      production: 1,
      traffic: 1,
      location: 'mine',
    })
      .then(town => {
        return request(app)
          .delete(`/api/v1/towns/${town._id}`);
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
