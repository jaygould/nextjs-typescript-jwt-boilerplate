import * as faker from 'faker';
import { User } from '../User';
import { Authentication } from '../Authentication';

describe('test the User service', () => {
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
});
