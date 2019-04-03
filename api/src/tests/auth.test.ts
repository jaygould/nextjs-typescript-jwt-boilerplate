require('dotenv').config();
import faker from 'faker';
import { createUser, loginUser } from '../api/services/auth';

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

const incorrectUserDetails: any = {
	email: '--',
	password: '--'
};

describe('API authentication', () => {
	it('registers user with correct details', done => {
		createUser({
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			password: user.password
		}).then((response: any) => {
			expect(response).toBeTruthy();
			done();
		});
	});
	it('logs user in with correct details', done => {
		loginUser({ email: user.email, password: user.password }).then(
			(response: any) => {
				expect(response).toBeTruthy();
				expect(response).toHaveProperty('email', user.email);
				done();
			}
		);
	});
	it('errors when incorrect details are given', done => {
		loginUser({
			email: incorrectUserDetails.email,
			password: incorrectUserDetails.password
		}).catch((err: any) => {
			expect(err).toBeInstanceOf(Error);
			done();
		});
	});
});
