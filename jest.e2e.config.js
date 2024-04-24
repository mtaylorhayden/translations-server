module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: [
    '<rootDir>/test/**/*.e2e-spec.ts',
    '<rootDir>/src/**/*.e2e-spec.ts',
  ],
  // Target only E2E test files
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: false, // Typically, coverage isn't collected for E2E tests
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setupE2E.ts'], // Optional setup file
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
