import { User } from "../payload-typed";
import { Access } from "payload/config";

export const isAdmin: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.roles["admin"]) ?? false;
};
