/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true, 
  images: {
    domains: ['res.cloudinary.com'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       // destination: 'https://pizza-house-dev.vercel.app/:path*',
  //       destination: 'http://localhost:3000/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
