import db from '../../db/models';
const Users = db.users;
const LoginActivity = db.login_activity;

import { IUser } from '../../types/user.types';

const createAccount = (user: Partial<IUser>) => {
	return Users.create({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password
	}).then((newUser: IUser) => {
		return newUser;
	});
};

const checkUserExists = (email: string) => {
	return Users.findOne({
		raw: true,
		where: { email }
	}).then((user: IUser) => {
		return user;
	});
};

const findByRefreshToken = (refreshToken: string) => {
	return Users.findOne({ raw: true, where: { refreshToken } }).then(
		(res: any) => {
			return res ? res.dataValues : null;
		}
	);
};

const saveRefreshToken = (token: string, email: string) => {
	return Users.update({ refreshToken: token }, { where: { email } });
};

const getUserByEmail = (email: string) => {
	return Users.findAll({
		where: { email },
		attributes: ['id', 'firstName', 'lastName']
	});
};

const logUserActivity = (userId: number, activity: string) => {
	return LoginActivity.create({ userId, activityType: activity });
};

export {
	createAccount,
	findByRefreshToken,
	checkUserExists,
	saveRefreshToken,
	getUserByEmail,
	logUserActivity
};
