// Ensures the database connection is closed once tests have finished
module.exports = async () => {
  const dbInstance = (global as any).testDbInstance;
  return await dbInstance.connectionManager.close();
};
