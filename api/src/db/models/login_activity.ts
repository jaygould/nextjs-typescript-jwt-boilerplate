module.exports = (sequelize: any, DataTypes: any) => {
  const loginActivity = sequelize.define(
    'login_activity',
    {
      userId: DataTypes.STRING,
      activityType: DataTypes.STRING
    },
    {}
  );
  loginActivity.associate = (models: any) => {
    // associations can be defined here
  };
  return loginActivity;
};
