/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["src", "components", "lib", "utils"], // Only run ESLint on these directories
  },
};

module.exports = nextConfig;
