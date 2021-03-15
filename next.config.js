const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
  env: {
    VERSION: packageJson.version,
    ENV: process.env.ENV,
  },

  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(html|text|md)$/,
      use: 'raw-loader',
    });

    if (!dev && !isServer && process.env.ENV === 'production') {
      config.optimization.minimizer = [
        new TerserPlugin({
          cache: true,
          parallel: true,
          // sourceMap: false,
          extractComments: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ];
    }

    return config;
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};
