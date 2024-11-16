module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|react-navigation|@react-navigation)'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  }
};
