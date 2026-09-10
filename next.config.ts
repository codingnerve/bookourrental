import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is currently served from a remote CDN. Swapping these for
    // local files under /public/images later only requires changing the `image`
    // fields in the `data/*` modules — no component changes.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
