module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  // set up for enzyme and allowing scss
  setupFilesAfterEnv: ['<rootDir>/ui/tests/_setup.tests.ts']
};
