require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {
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

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@email.com',
        password: 'firetruck'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@email.com'
        });
      });
  });

  it('log ins a user', async() => {
    await User.create({
      email: 'email@email.com',
      password: 'firetruck'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'email@email.com',
        password: 'firetruck'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'email@email.com'
        });
      });
  });

  it('checks if there signed in', () => {
    const agent = request.agent(app);
    return agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        password: 'firetruck'
      })
      .then(() => agent.get('/api/v1/auth/verify'))
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'email@email.com'
        });
      });
  });
});
