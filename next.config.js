const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js'],
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: ['c.saavncdn.com'],
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    return config;
  },
});

module.exports = nextConfig;

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'c.saavncdn.com',
//         port: '',
//         // pathname: '/account123/**',
//       },
//     ],
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
// };
