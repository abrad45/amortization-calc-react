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
});
