// next.config.js
module.exports = {
  compress: true,
  images: {
    domains: ['beta.walmartvriddhi.org', 'docs.walmartvriddhi.org', 'walmartvriddhi.vercel.app', 'walmartvriddhi.org'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: '/register-with-walmart-marketplace',
        destination: 'https://web.walmartvriddhi.org/',
        permanent: true, // This will issue a permanent redirect (HTTP 308)
      },
      {
        source: '/register-with-walmartvriddhi',
        destination: 'https://web.walmartvriddhi.org/',
        permanent: true, // This will issue a permanent redirect (HTTP 308)
      },
    ];
  },
}
