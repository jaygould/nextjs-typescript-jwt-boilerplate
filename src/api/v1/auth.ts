import { Router } from 'express';
const router = Router();
import bcrypt from 'bcrypt';
import * as errors from '../../helpers/error';
import * as AuthModel from '../models/auth';
import * as AuthService from '../services/auth';

import { ILoginIn, IUser } from '../../types/user.types';

router.post('/register', (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !firstName || !lastName || !password) {
		return errors.errorHandler(res, 'You must send all register details.', '');
	}

	const existingUserCheck = AuthModel.checkUserExists(email);
	return existingUserCheck
		.then((userChecks: ILoginIn) => {
			if (userChecks) {
				return errors.errorHandler(res, 'You are already registered.', null);
			}
			const passwordHash = bcrypt.hashSync(password.trim(), 12);
			const newUser: Partial<IUser> = { firstName, lastName, email };
			newUser.password = passwordHash;
			return AuthModel.createAccount(newUser);
		})
		.then((user: IUser) => {
			return AuthModel.logUserActivity(user.id, 'signup');
		})
		.then(() => {
			return res.send({ success: true });
		})
		.catch((err: any) => {
			return errors.errorHandler(res, err, null);
		});
});

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return errors.errorHandler(res, 'You must send all login details.', null);
	}
	return AuthService.loginUser({ email, password })
		.then((user: IUser) => {
			const authToken = AuthService.createToken(user);
			const refreshToken = AuthService.createRefreshToken(user.email);
			const userActivityLog = AuthModel.logUserActivity(user.id, 'login');
			return Promise.all([authToken, refreshToken, userActivityLog]).then(
				tokens => {
					return {
						authToken: tokens[0],
						refreshToken: tokens[1]
					};
				}
			);
		})
		.then((user: IUser) => {
			return (
				user &&
				res.send({
					success: true,
					authToken: user.authToken,
					refreshToken: user.refreshToken
				})
			);
		})
		.catch((err: string) => {
      console.log(err)
			return errors.errorHandler(res, err, null);
		});
});

router.post('/validate', (req, res) => {
	const authToken = req.body.authToken;
	if (!authToken) {
		return errors.errorHandler(res, 'No auth token.', null);
	}
	AuthService.validateAuthToken(authToken)
		.then((validated: boolean) => {
			res.send({
				success: true
			});
		})
		.catch((err: string) => {
			res.send({
				success: false
			});
		});
});

module.exports = router;
