const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Users = require('../../db/models').users;
const { authSecret } = require('../config')

let loginUser = (email, password) => {
  return Users.findOne({ where: { email: email }})
  .then(user => {
    if (!user) throw 'No matching user.';
    return new Promise((res, rej) => {
      bcrypt.compare(password, user.password, (err, success) => {
        if (err) {
          rej('The has been an unexpected error, please try again later');
        }
        if (!success) {
          rej('Your password is incorrect.');
        } else {
          res(user.toJSON());
        }
      });
    });
  })
}

let createToken = user => {
	return jwt.sign(_.omit(user, 'password'), authSecret, {
		expiresIn: '10s' //lower value for testing
	});
};

let createRefreshToken = userEmail => {
	let refreshToken = jwt.sign({ type: 'refresh' }, authSecret, {
		expiresIn: '2h' // 1 hour
	});
	return Users.update(
    { refreshToken: refreshToken },
    {where: 
      { email: userEmail }
    },
	)
		.then(() => {
			return refreshToken;
		})
		.catch(err => {
			throw err;
		});
};

let validateRefreshToken = refreshToken => {
	if (refreshToken != '') {
		return new Promise((res, rej) => {
			jwt.verify(refreshToken, authSecret, err => {
				if (err) {
					rej({
						code: 'refreshExpired',
						message: 'Refresh token expired - session ended.'
					});
				} else {
					Users.findOne({ refreshToken: refreshToken })
						.then(user => {
							res(user);
						})
						.catch(err => {
							rej(err);
						});
				}
			});
		});
	} else {
		throw 'There is no refresh token to check.';
	}
};

let validateAuthToken = authToken => {
  return new Promise((res, rej) => {
    jwt.verify(authToken, authSecret, err => {
      if (err) {
        rej();
      } else {
        res()
      }
    });
  });
};

module.exports = {
  loginUser,
	createToken,
	createRefreshToken,
  validateRefreshToken,
  validateAuthToken
};
