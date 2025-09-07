import type { NextConfig } from "next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-preview.redd.it",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.redditmedia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "redditmedia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c.thumbs.redditmedia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.redditstatic.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
