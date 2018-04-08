module.exports = {
  "moduleNameMapper": {
    "^.+\\.(css|less|scss|svg)$": "identity-obj-proxy"
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
}
