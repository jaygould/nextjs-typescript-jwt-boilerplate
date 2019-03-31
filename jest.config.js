module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  // set up for enzyme and allowing scss
  setupFilesAfterEnv: ["<rootDir>/ui/tests/_setup.tests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};
