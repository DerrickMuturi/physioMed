// next.config.mjs
import path from "path";
import { withPayload } from "@payloadcms/next-payload";

const nextConfig = {
  reactStrictMode: true,
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  resolve: {
    fallback: {
      async_hooks: false
    }
  }
};

const payloadConfig = {
  configPath: path.resolve("./payload.config.ts"),
  adminRoute: "/admin",
};

export default withPayload(nextConfig, payloadConfig);