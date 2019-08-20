module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/testBed/mocks/jestSetup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  }
  //testNamePattern: "component"
};