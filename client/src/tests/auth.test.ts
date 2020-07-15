require('dotenv').config();
import faker from 'faker';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
import AuthService from '../services/auth.service';

const user: any = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD
};

const newUser: any = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

const fakeTokenSecret = 'winteriscoming';
const fakeTokenValue = 'cats';
const fakeToken = jwt.sign({ ilove: fakeTokenValue }, fakeTokenSecret);

describe('Login and register', () => {
  it('registers user', () => {
    return AuthService.registerUser({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password
    }).then(response => {
      expect(response.success).toBeTruthy();
    });
  });
  it('logs user in', () => {
    return AuthService.loginUser({
      email: user.email,
      password: user.password
    }).then(response => {
      expect(response.success).toBeTruthy();
      expect(response.authToken).toBeDefined();
    });
  });
  it('saves token', () => {
    const cookies = new Cookies();
    return AuthService.saveTokens(faker.random.word()).then(() => {
      const authToken = cookies.get('authToken');
      expect(authToken).toBeDefined();
    });
  });
  it('creates and parses a valid jwt', () => {
    const tokenPayload: any = jwt.verify(fakeToken, fakeTokenSecret);
    expect(AuthService.parseJwt(fakeToken)).not.toBeFalsy();
    expect(tokenPayload.ilove).toContain(fakeTokenValue);
  });
});
