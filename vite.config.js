const path = require('path');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
    plugins: [react()],
    server: {
        port: 1234,
    },
    resolve: {
        alias: [
            {
                find: '/components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '/routes',
                replacement: path.resolve(__dirname, 'src/routes'),
            },
            {
                find: '/reducers',
                replacement: path.resolve(__dirname, 'src/reducers'),
            },
            {
                find: '/hooks',
                replacement: path.resolve(__dirname, 'src/hooks'),
            },
            {
                find: '/utilities',
                replacement: path.resolve(__dirname, 'src/utilities'),
            },
        ],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{js,jsx}'],
            exclude: [
                'src/test/**',
                '**/*.test.{js,jsx}',
                '**/*.spec.{js,jsx}',
                'src/index.js',
                'src/index.jsx',
                '**/index.js', // Exclude index.js files that are just re-exports
            ],
            thresholds: {
                lines: 90,
                functions: 90,
                branches: 90,
                statements: 90,
            },
        },
    },
});
