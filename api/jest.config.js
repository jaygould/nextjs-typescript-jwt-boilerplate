module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  globalSetup: './src/db/test-setup.ts',
  globalTeardown: './src/db/test-teardown.ts'
};
