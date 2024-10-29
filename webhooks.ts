import express from "express";
import { webhookRequest } from "./server";
import { Webhook } from "svix";
import { EmailAddress, WebhookEvent } from "@clerk/express";
import { createUserInPayload, signInPayloadUser } from "./lib/auth";
import axios from "axios";

export const clerkWebHookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as webhookRequest;
  const body = webhookRequest.rawBody;
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const API_KEY = process.env.CLERK_SECRET_KEY;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined.");
    res.status(500).send("Server error: WEBHOOK_SECRET not defined");
  }

  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).send("Error occurred -- no svix headers");
  }

  const wh = new Webhook(WEBHOOK_SECRET!);

  try {
    const event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    switch (event.type) {
      case "user.created":
        const userData = event.data;
        await createUserInPayload(userData);
        break;

      case "session.created":
        const userInfo = event.data;
        const clerkResponse = await axios.get(
          `https://api.clerk.dev/v1/users/${userInfo.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        const emailAddress = clerkResponse.data.emailAddresses[0].emailAddress;
        const password = clerkResponse.data.id;
        await signInPayloadUser(emailAddress, password);
        break;

      default:
        console.log("Unhandled event type", event.type);
    }

    res.status(200).send("Webhook created successfully");
  } catch (error) {
    console.log("error verifying webhook", error);
    res.status(400).send("Error occurred -- invalid svix signature");
  }
};
