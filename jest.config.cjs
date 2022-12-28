const config = {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    testMatch: ['**/__tests__/*.test.ts', '**/*.test.ts'],
}

module.exports = config
