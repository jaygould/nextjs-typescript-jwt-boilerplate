'use strict';
module.exports = (sequelize, DataTypes) => {
  const login_activity = sequelize.define('login_activity', {
    userId: DataTypes.STRING,
    activityType: DataTypes.STRING
  }, {});
  login_activity.associate = function(models) {
    // associations can be defined here
  };
  return login_activity;
};