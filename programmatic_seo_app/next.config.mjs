/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['nodemailer', 'mysql2', 'bcryptjs'],
};

export default nextConfig;
