module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest'
};
