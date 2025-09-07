import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
