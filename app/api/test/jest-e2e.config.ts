// @ts-check
import baseConfig from './base-jest.config';
import type { Config } from 'jest';

const config: Config = { ...baseConfig, testRegex: '/test/e2e/*/*.*.e2e-spec.ts$' };

export default config;
