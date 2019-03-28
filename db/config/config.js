require('dotenv').config();

module.exports = {
	development: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false
	},
	test: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false
	},
	production: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false
	}
};
