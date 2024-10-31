"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("payload/config");
const bundler_webpack_1 = require("@payloadcms/bundler-webpack");
const db_postgres_1 = require("@payloadcms/db-postgres");
const richtext_slate_1 = require("@payloadcms/richtext-slate");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("./collections/users");
const posts_1 = require("./collections/posts");
const categories_1 = require("./collections/categories");
const media_1 = require("./collections/media");
const comments_1 = require("./collections/comments");
dotenv_1.default.config({
    path: path_1.default.join(__dirname, ".env"),
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    admin: {
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        buildPath: "/admin",
    },
    routes: {
        admin: "/admin",
    },
    db: (0, db_postgres_1.postgresAdapter)({
        pool: {
            connectionString: process.env.DATABASE_URL,
        },
    }),
    editor: (0, richtext_slate_1.slateEditor)({}),
    collections: [users_1.Users, posts_1.Posts, categories_1.Categories, media_1.Media, comments_1.Comments],
    rateLimit: {
        max: 2000,
    },
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-typed.ts"),
    },
});
