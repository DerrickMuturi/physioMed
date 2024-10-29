// next.config.mjs
import path from "path";
import { withPayload } from "@payloadcms/next-payload";

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingExcludes: [],
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

const payloadConfig = {
  configPath: path.resolve("./payload.config.ts"),
  adminRoute: "/admin",
};

export default withPayload(nextConfig, payloadConfig);