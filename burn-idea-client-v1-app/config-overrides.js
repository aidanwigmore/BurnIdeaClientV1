const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = override(
    addWebpackAlias({
        '@context': path.resolve(__dirname, 'src/context'),
        '@theme': path.resolve(__dirname, 'src/theme'),
    }),
    (config) => {
        config.plugins = (config.plugins || []).concat([
            new Dotenv({
                path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
            }),
        ]);
        return config;
    }
);