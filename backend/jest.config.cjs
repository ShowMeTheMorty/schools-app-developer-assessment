module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  clearMocks: true,
  collectCoverageFrom: [
    'services/**/*.ts',
    'controllers/**/*.ts',
    'routes/**/*.ts',
    '!**/*.d.ts',
  ],
};
