/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "imgur.com",
      "i.imgur.com",
      "https://imgur.com",
      "poodlesvonapalusso.xyz",
      "poodlesvonapalusso.dog",
    ],
  },
};

module.exports = nextConfig;
