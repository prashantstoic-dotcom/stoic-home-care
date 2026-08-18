/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['nodemailer', 'mysql2', 'bcryptjs'],
  },
};

module.exports = nextConfig;
