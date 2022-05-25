/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const nextConfig = withPWA({
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  experimental: {
    newNextLinkBehavior: true,
  },
  pwa: {
    dest: 'public',
  },
})

module.exports = nextConfig
