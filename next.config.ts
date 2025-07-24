import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // 优化字体加载
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 确保静态资源正确处理
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
};

export default nextConfig;
