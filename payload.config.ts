import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from "dotenv";
import { Users } from "./collections/users";
import { Posts } from "./collections/posts";

dotenv.config({
  path: path.join(__dirname, ".env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    bundler: webpackBundler(),
  },
  routes: {
    admin: "/admin",
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: slateEditor({}),
  collections: [Users, Posts],
  rateLimit: {
    max: 2000,
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-typed.ts"),
  },
});
