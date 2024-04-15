/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  distDir: 'build',
  i18n: {
    locales: ['en-US', 'fi'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
