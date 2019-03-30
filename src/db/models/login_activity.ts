'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
	const login_activity = sequelize.define(
		'login_activity',
		{
			userId: DataTypes.STRING,
			activityType: DataTypes.STRING
		},
		{}
	);
	login_activity.associate = (models: any) => {
		// associations can be defined here
	};
	return login_activity;
};
