module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '.*\\.test\\.ts$',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };