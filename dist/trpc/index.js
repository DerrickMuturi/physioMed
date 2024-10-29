"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const zod_1 = require("zod");
const auth_router_1 = require("./auth-router");
const trpc_1 = require("./trpc");
const get_payload_1 = require("../get-payload");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    getAllPosts: trpc_1.publicProcedure.query(async () => {
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            const posts = await payload.find({
                collection: "posts",
                where: {
                    status: {
                        equals: "published",
                    },
                },
                sort: "-createdAt",
                depth: 1,
                limit: 100,
            });
            const allPosts = posts.docs.map((doc) => ({
                id: doc.id,
                title: doc.title,
                subtitle: doc.subtitle,
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
                content: doc.content,
                type: doc.type,
                status: doc.status,
                categories: doc.categories,
                cover: doc.cover,
            }));
            return allPosts;
        }
        catch (error) {
            console.log("error fetching all posts", error);
            return [];
        }
    }),
    getPostOnTitle: trpc_1.publicProcedure
        .input(zod_1.z.object({
        title: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const { title } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            const { docs: posts } = await payload.find({
                collection: "posts",
                where: {
                    title: {
                        equals: title,
                    },
                },
                sort: "-createdAt",
                depth: 1,
                limit: 100,
            });
            const post = posts.map((doc) => ({
                id: doc.id,
                title: doc.title,
                subtitle: doc.subtitle,
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
                content: doc.content,
                type: doc.type,
                status: doc.status,
                categories: doc.categories,
                cover: doc.cover,
            }));
            return {
                post,
            };
        }
        catch (error) {
            console.log("Error getting post on title", error);
        }
    }),
    getTopPosts: trpc_1.publicProcedure.query(async () => {
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            const { docs: posts } = await payload.find({
                collection: "posts",
                where: {
                    status: {
                        equals: "published",
                    },
                },
                sort: "-createdAt",
                depth: 1,
                limit: 6,
            });
            const Posts = posts.map((doc) => ({
                id: doc.id,
                title: doc.title,
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
                subtitle: doc.subtitle,
                content: doc.content,
                type: doc.type,
                status: doc.status,
                categories: doc.categories,
                cover: doc.cover,
            }));
            return Posts;
        }
        catch (error) {
            console.log("error");
            return [];
        }
    }),
    getCategories: trpc_1.publicProcedure.query(async () => {
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            const { docs: categories } = await payload.find({
                collection: "category",
                sort: "-createdAt",
                depth: 1,
                limit: 100,
            });
            const categoriesList = categories.map((doc) => ({
                id: doc.id,
                name: doc.name,
                updatedAt: doc.updatedAt,
                createdAt: doc.updatedAt,
            }));
            return categoriesList;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }),
    getPostOnCategory: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
    }))
        .query(async ({ input }) => {
        const { id } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            const { docs: posts } = await payload.find({
                collection: "posts",
                where: {
                    categories: {
                        contains: id,
                    },
                },
                sort: "-createdAt",
                depth: 1,
                limit: 100,
            });
            const postsFromCategories = posts.map((doc) => ({
                id: doc.id,
                title: doc.title,
                subtitle: doc.subtitle,
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
                content: doc.content,
                type: doc.type,
                status: doc.status,
                categories: doc.categories,
                cover: doc.cover,
            }));
            return postsFromCategories;
        }
        catch (error) {
            console.log("Could not  get posts based on Category", error);
            return [];
        }
    }),
});
