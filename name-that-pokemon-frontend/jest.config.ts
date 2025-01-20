import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  testEnvironment: 'jsdom'
};

export default jestConfig;