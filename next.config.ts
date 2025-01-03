import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Use 'https' for secure URLs
        hostname: 'cdn.sanity.io', // Allow images from this hostname
        pathname: '/images/**', // Adjust the pathname if needed
      },
    ],
  },
};

export default nextConfig;
