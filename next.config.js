/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
    typedRoutes: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = nextConfig;
