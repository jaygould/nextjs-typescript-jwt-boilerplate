import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as AuthModel from '../models/auth';

import { ILoginIn, IUser } from '../../types/user.types';
const { authSecret } = require('../config');

const loginUser = ({ email, password }: ILoginIn) => {
	return AuthModel.checkUserExists(email).then((user: IUser) => {
		if (!user) {
			throw new Error('No matching user.');
		}
		return new Promise((res, rej) => {
			bcrypt.compare(password, user.password, (err: Error, success: boolean) => {
				if (err) {
					rej('The has been an unexpected error, please try again later');
				}
				if (!success) {
					rej('Your password is incorrect.');
				} else {
					res(user);
				}
			});
		});
	});
};

const createToken = (user: IUser) => {
	return jwt.sign(_.omit(user, 'password'), authSecret, {
		expiresIn: '10m'
	});
};

const createRefreshToken = (userEmail: string) => {
	const refreshToken = jwt.sign({ type: 'refresh' }, authSecret, {
		expiresIn: '2h' // 1 hour
	});
	return AuthModel.saveRefreshToken(refreshToken, userEmail)
		.then(() => {
			return refreshToken;
		})
		.catch((err: Error) => {
			throw err;
		});
};

const validateRefreshToken = (refreshToken: string) => {
	if (refreshToken != '') {
		return new Promise((res, rej) => {
			jwt.verify(refreshToken, authSecret, (err: Error) => {
				if (err) {
					rej({
						code: 'refreshExpired',
						message: 'Refresh token expired - session ended.'
					});
				} else {
					AuthModel.findByRefreshToken(refreshToken)
						.then((user: IUser) => {
							res(user);
						})
						.catch((uErr: Error) => {
							rej(uErr);
						});
				}
			});
		});
	} else {
		throw new Error('There is no refresh token to check.');
	}
};

const validateAuthToken = (authToken: string) => {
	return new Promise((res, rej) => {
		jwt.verify(authToken, authSecret, (err: Error) => {
			if (err) {
				rej();
			} else {
				res();
			}
		});
	});
};

export {
	loginUser,
	createToken,
	createRefreshToken,
	validateRefreshToken,
	validateAuthToken
};
