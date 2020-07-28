const { app } = require('../../app');
import db from '../../db/models';

import * as faker from 'faker';
import supertest from 'supertest';

import { Authentication } from '../../services/Authentication';

describe('test the JWT authorization middleware', () => {
  let thisDb: any = db;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });

  it('should succeed when accessing an authed route with a valid JWT', async () => {
    const authentication = new Authentication();
    const randomString = faker.random.alphaNumeric(10);
    const email = `user-${randomString}@email.com`;
    const password = `password`;
    const firstName = `John`;
    const lastName = `Smith`;

    await authentication.createUser({ firstName, lastName, email, password });

    const { authToken } = await authentication.loginUser({
      email,
      password
    });

    const response = await supertest(app)
      .post('/v1/auth/protected')
      .expect(200)
      .set('authorization', `bearer ${authToken}`);

    expect(response.body).toMatchObject({
      success: true
    });
  });

  it('should fail when accessing an authed route with an invalid JWT', async () => {
    const invalidJwt = 'OhMyToken';

    const response = await supertest(app)
      .post('/v1/auth/protected')
      .expect(400)
      .set('authorization', `bearer ${invalidJwt}`);

    expect(response.body).toMatchObject({
      success: false,
      message: 'Invalid token.'
    });
  });

  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
