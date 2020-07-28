import db from '../../db/models';

import * as faker from 'faker';

import { Authentication } from '../Authentication';

describe('test the Authentication service', () => {
  let thisDb: any = db;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });

  it('should successfully create a user with valid details', async () => {
    const authentication = new Authentication();
    const randomString = faker.random.alphaNumeric(10);
    const email = `user-${randomString}@email.com`;
    const password = `password`;
    const firstName = `John`;
    const lastName = `Smith`;

    const newUser = await authentication.createUser({ firstName, lastName, email, password });

    expect(newUser).toMatchObject({
      id: expect.any(Number)
    });
  });

  it('should fail to create a user with missing signup data', async () => {
    const authentication = new Authentication();
    const password = `password`;
    const firstName = `John`;
    const lastName = `Smith`;

    await expect(authentication.createUser({ firstName, lastName, password })).rejects.toThrow(
      new Error('You must send all register details.')
    );
  });

  it('should successfully log in a user with correct login details', async () => {
    const authentication = new Authentication();
    const randomString = faker.random.alphaNumeric(10);
    const email = `user-${randomString}@email.com`;
    const password = `password`;
    const firstName = `John`;
    const lastName = `Smith`;

    await authentication.createUser({ firstName, lastName, email, password });

    const loginResponse = await authentication.loginUser({
      email,
      password
    });

    expect(loginResponse).toMatchObject({
      authToken: expect.any(String)
    });
  });

  it('should fail to log in a user with incorrect password', async () => {
    const authentication = new Authentication();
    const randomString = faker.random.alphaNumeric(10);
    const email = `user-${randomString}@email.com`;
    const password = `password`;
    const wrongPassword = `foobar`;
    const firstName = `John`;
    const lastName = `Smith`;

    await authentication.createUser({ firstName, lastName, email, password });

    await expect(
      authentication.loginUser({
        email,
        password: wrongPassword
      })
    ).rejects.toThrow(new Error('Your password is incorrect.'));
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
