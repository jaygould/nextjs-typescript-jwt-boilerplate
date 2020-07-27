import db from '../db/models';

// Ensures the database is empty and migrations done before starting tests
module.exports = async () => {
  const testDbInstance = db.sequelize;
  await testDbInstance.sync({ force: true });
  (global as any).testDbInstance = testDbInstance;
};
