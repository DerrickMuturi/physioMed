import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { Category, Post } from "../payload-typed";
import payload from "payload";

export const appRouter = router({
  auth: authRouter,
  getAllPosts: publicProcedure.query(async () => {
    const payload = await getPayloadClient();

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

      const allPosts: Post[] = posts.docs.map((doc) => ({
        id: doc.id as number,
        title: doc.title as string,
        subtitle: doc.subtitle as string,
        updatedAt: doc.updatedAt as string,
        createdAt: doc.createdAt as string,
        content: doc.content as Post["content"],
        type: doc.type as Post["type"],
        status: doc.status as Post["status"],
        categories: doc.categories as Post["categories"],
        cover: doc.cover as Post["cover"],
      }));

      return allPosts;
    } catch (error) {
      console.log("error fetching all posts", error);
      return [];
    }
  }),
  getPostOnTitle: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { title } = input;
      const payload = await getPayloadClient();

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

        const post: Post[] = posts.map((doc) => ({
          id: doc.id as number,
          title: doc.title as string,
          subtitle: doc.subtitle as string,
          updatedAt: doc.updatedAt as string,
          createdAt: doc.createdAt as string,
          content: doc.content as Post["content"],
          type: doc.type as Post["type"],
          status: doc.status as Post["status"],
          categories: doc.categories as Post["categories"],
          cover: doc.cover as Post["cover"],
        }));

        return {
          post,
        };
      } catch (error) {
        console.log("Error getting post on title", error);
      }
    }),
  getTopPosts: publicProcedure.query(async () => {
    const payload = await getPayloadClient();

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

      const Posts: Post[] = posts.map((doc) => ({
        id: doc.id as number,
        title: doc.title as string,
        updatedAt: doc.updatedAt as string,
        createdAt: doc.createdAt as string,
        subtitle: doc.subtitle as string,
        content: doc.content as Post["content"],
        type: doc.type as Post["type"],
        status: doc.status as Post["status"],
        categories: doc.categories as Post["categories"],
        cover: doc.cover as Post["cover"],
      }));

      return Posts;
    } catch (error) {
      console.log("error");
      return [];
    }
  }),
  getCategories: publicProcedure.query(async () => {
    const payload = await getPayloadClient();
    try {
      const { docs: categories } = await payload.find({
        collection: "category",
        sort: "-createdAt",
        depth: 1,
        limit: 100,
      });
      const categoriesList: Category[] = categories.map((doc) => ({
        id: doc.id as number,
        name: doc.name as string,
        updatedAt: doc.updatedAt as string,
        createdAt: doc.updatedAt as string,
      }));

      return categoriesList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }),
  getPostOnCategory: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const payload = await getPayloadClient();

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

        const postsFromCategories: Post[] = posts.map((doc) => ({
          id: doc.id as number,
          title: doc.title as string,
          subtitle: doc.subtitle as string,
          updatedAt: doc.updatedAt as string,
          createdAt: doc.createdAt as string,
          content: doc.content as Post["content"],
          type: doc.type as Post["type"],
          status: doc.status as Post["status"],
          categories: doc.categories as Post["categories"],
          cover: doc.cover as Post["cover"],
        }));

        return postsFromCategories;
      } catch (error) {
        console.log("Could not  get posts based on Category", error);
        return [];
      }
    }),
});

export type AppRouter = typeof appRouter;
