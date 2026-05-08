export default {
  roots: ['<rootDir>/test'],
  testRegex: '.*\\.(spec|test)\\.ts$',
  modulePaths: ['<rootDir>'],
  testTimeout: 5 * 60 * 1000,
  moduleNameMapper: {
    '^~/test/(.*)$': '<rootDir>/test/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: 'inline',
      },
    ],
  },
  coverageReporters: ['json', 'text'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/shared/domain/entities/entity.ts',
    'src/shared/domain/entities/user.ts',
    'src/account/application/commands/login.command.ts',
    'src/account/application/commands/create-account.command.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      lines: 100,
      branches: 100,
    },
  },
};
