import db from '../../db/models';

import * as faker from 'faker';

import { Authentication } from '../Authentication';
import { User } from '../User';

describe('test the User service', () => {
  let thisDb: any = db;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });

  it('should return user details if a user exists', async () => {
    const authentication = new Authentication();
    const randomString = faker.random.alphaNumeric(10);
    const user = new User(`John`, `Smith`, `user-${randomString}@email.com`);
    const password = `password`;

    await authentication.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password
    });

    const doesUserExist = await user.doesUserExist();

    expect(doesUserExist).toMatchObject({
      id: expect.any(Number)
    });
  });

  it('should return null if a user does not exist', async () => {
    const randomString = faker.random.alphaNumeric(10);
    const user = new User(`John`, `Smith`, `user-${randomString}@email.com`);
    const doesUserExist = await user.doesUserExist();

    expect(doesUserExist).toBeNull();
  });

  afterAll(async () => {
    await thisDb.sequelize.close();
  });
});
