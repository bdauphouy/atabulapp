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
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
  },
})

module.exports = nextConfig
