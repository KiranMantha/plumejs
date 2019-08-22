module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/testBed/mocks/jestSetup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    "**/src/**",
    "!**/dist/**",
    "!**/node_modules/**",
    "!**/testBed/**"
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
  //testNamePattern: "component"
};
