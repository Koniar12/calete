module.exports = {
  // Specify the test environment (e.g., jsdom, node)
  testEnvironment: 'node',

  // Define a regular expression pattern to match test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',   

  // Specify the directories where Jest should search for tests
  roots: ['<rootDir>'],

  // List of test files to ignore
  testPathIgnorePatterns: ['/node_modules/'],

  // Define a coverage directory for code coverage reports
  coverageDirectory: '<rootDir>/coverage',

  // Set up Jest to collect coverage from specified source files
  collectCoverageFrom: ['**/*.js'],

  // Define a list of file extensions Jest should look for
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Define the setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};