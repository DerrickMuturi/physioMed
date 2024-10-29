"use server";

import payload, { Payload } from "payload";
import { InitOptions } from "payload/config";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  console.log("Initializing Payload client...");
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    console.log("Returning cached client.");
    return cached.client;
  }

  console.log(process.env.DATABASE_URL);
  if (!cached.promise) {
    console.log("Creating new Payload client promise.");

    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
    console.log("Payload client initialized successfully.");
  } catch (e: unknown) {
    console.error("Error initializing Payload client:", e);
    cached.promise = null;
    throw e;
  }
  return cached.client;
};
