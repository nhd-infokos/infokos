import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'irrxidgclpdezirkwzmr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to detail pages where TikTok embeds are used
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            // Allow TikTok iframe to use unload and other features it needs
            value: 'unload=(*)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
