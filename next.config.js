const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com'],
  },
  /*env:{
    API_URL: process.env.API_URL,
    GQL_URL: process.env.GQL_URL,
    PRODUCTION: process.env.PRODUCTION,
  }*/
  eslint: {
    dirs: ['.'] //or ['pages', 'hooks']
  }
}

module.exports = nextConfig