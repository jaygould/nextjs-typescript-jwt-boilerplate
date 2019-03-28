const Users = require('../../db/models').users;
const LoginActivity = require('../../db/models').login_activity;

let createAccount = user => {
	return Users.create(
		{
			firstName: user.firstName,
			lastName: user.lastName,
      email: user.email,
      password: user.password
		}
	)
		.then(newUser => {
			return newUser.toJSON();
		});
};


let checkUserExists = email => {
	return Users.findOne({
		where: { email }
	}).then(res => {
		return res ? res.dataValues : null;
	});
};

let findByRefreshToken = refreshToken => {
	return UsersP.findOne({ where: { refreshToken: refreshToken } }).then(res => {
		return res ? res.dataValues : null;
	});
};

let saveRefreshToken = (token, userId) => {
	return UsersP.update({ refreshToken: token }, { where: { id: userId } });
};

let getUserByEmail = email => {
	return UsersP.findAll({
		where: { email },
		attributes: ['id', 'firstName', 'lastName'],
	});
};

let logUserActivity = (userId, activity) => {
	return LoginActivity.create({ userId, activityType: activity });
};

module.exports = {
	createAccount,
	findByRefreshToken,
	checkUserExists,
	saveRefreshToken,
  getUserByEmail,
  logUserActivity
};
