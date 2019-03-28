const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const errors = require('../../helpers/error');
const AuthService = require('../services/auth')
const AuthModel = require('../models/auth')

router.post('/register', (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
  const password = req.body.password;
	if (!email || !firstName || !lastName|| !password) {
		return errors.errorHandler(res, 'You must send all register details.');
	}

	let existingUserCheck = AuthModel.checkUserExists(email);
	return existingUserCheck
		.then((userChecks) => {
      if(userChecks){
        return errors.errorHandler(res, 'You are already registered.');
      }
      let passwordHash = bcrypt.hashSync(password.trim(), 12);
			let newUser = { firstName, lastName, email };
			newUser.password = passwordHash;
      return AuthModel.createAccount(newUser)
    })
    .then((user) => {
      return AuthModel.logUserActivity(user.id, 'signup');
    }).then(() => {
			return res.send({ success: true });
    })
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

router.post('/login', (req, res) => {	      
	const email = req.body.email;
  const password = req.body.password;
	if (!email || !password) {
		return errors.errorHandler(res, 'You must send all login details.');
	}
  return AuthService.loginUser(email, password)
  .then((user) => {
    let authToken = AuthService.createToken(user);
    let refreshToken = AuthService.createRefreshToken(user.email);
    let userActivityLog = AuthModel.logUserActivity(user.id, 'login');
    return Promise.all([authToken, refreshToken, userActivityLog]).then(
      tokens => {
        return {
          authToken: tokens[0],
          refreshToken: tokens[1]
        };
      }
    );
  })
  .then((user) => {
    return user && 
      res.send({ 
        success: true,
        authToken: user.authToken,
				refreshToken: user.refreshToken
      });
  })
  .catch(err => {
		return errors.errorHandler(res, err);
	});
})

router.post('/validate', (req, res) => {	      
  const authToken = req.body.authToken;
  if(!authToken){
    return errors.errorHandler(res, 'No auth token.');
  }
  AuthService.validateAuthToken(authToken).then(validated => {
    res.send({ 
      success: true
    });
  }).catch(err => {
    res.send({ 
      success: false
    });
  })
})

module.exports = router;