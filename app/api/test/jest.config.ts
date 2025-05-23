// @ts-check
import baseConfig from './base-jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseConfig,
  testRegex: '/test/unit/*/*.*.spec.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: './coverage',
  coverageThreshold: { global: { lines: 85 } },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: [
    'coverage',
    'dist',
    'node_modules',
    'test',
    'main.ts',
    '\\.(e2e-)spec\\.ts$',
    '\\.(module|abstract|interface|type|d|model|dto|entry.*)\\.ts$',
  ],
};

export default config;
