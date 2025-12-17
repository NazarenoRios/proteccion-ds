import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
// @ts-ignore
const { compilerOptions } = require('./tsconfig.app.json');

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Mapeo de paths de TypeScript
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // 🔹 Busca tests en src
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  testPathIgnorePatterns: ['<rootDir>/dist/', '\\.d\\.ts$'],
};

export default config;
