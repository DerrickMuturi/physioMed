/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true, // Ensures SWC minification is enabled
  experimental: {
    swcLoader: true, // Enables SWC as the default loader
  },
  reactStrictMode: true,
  resolve: {
    fallback: {
      async_hooks: false,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*', // Proxy to Payload server
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'ignore-loader',
    })
    // Ignore `.node` files from being bundled on the server-side
    if (isServer) {
      config.externals.push({
        sharp: 'commonjs sharp'
      });
    }
    config.resolve = {
      ...config.resolve,
      fallback: {
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
      },
    };
    return config;
  },
};

export default nextConfig;
