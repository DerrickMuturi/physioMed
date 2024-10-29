import { Access } from "payload/config";
import { User } from "../payload-typed";

export const isAdminorHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.roles.includes("admin")) return true;

    return {
      user: {
        equals: req.user.id,
      },
    };
  };
