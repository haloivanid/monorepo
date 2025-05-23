// @ts-check
import type { Config } from 'jest';

const baseConfig: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleNameMapper: { '^@shared/(.*)$': '<rootDir>/src/shared/$1', '^@base/(.*)$': '<rootDir>/src/domain/base/$1' },
};

export default baseConfig;
