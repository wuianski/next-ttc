/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  },
  images: {
    remotePatterns: [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}`],
    // minimumCacheTTL: 60,
    /* add remotePatterns to fix issue of Un-configured Host*/
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asssets-ttc.sgp1.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [50, 75, 100],
  },
}

module.exports = (nextConfig);
