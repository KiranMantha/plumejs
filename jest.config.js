module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    '<rootDir>/testBed/mocks/jestSetup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  transform: {
    "\\.(ts|js)x?$": "ts-jest",
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    "**/src/**",
    "!**/dist/**",
    "!**/node_modules/**",
    "!**/testBed/**"
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/config/tsconfig.test.json'
    }
  }
  //testNamePattern: "component"
};
