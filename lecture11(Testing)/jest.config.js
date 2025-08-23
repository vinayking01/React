module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  clearMocks: true,
};