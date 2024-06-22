/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    typedRoutes: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = nextConfig;
