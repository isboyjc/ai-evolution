import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.isboyjc.com',
        // port: '', // 如有需要可指定端口
        // pathname: '/ai-evolution/**', // 如有需要可指定路径
      },
    ],
    formats: ['image/avif', 'image/webp'],
  }
};

export default withMDX(config);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
