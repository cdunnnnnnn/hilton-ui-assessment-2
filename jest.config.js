module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  //setupFiles: ['<rootDir>/jest.setup.js', "jest-localstorage-mock"],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
}
