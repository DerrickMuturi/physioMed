import { User } from "../payload-typed";
import { Access } from "payload/config";

export const isLoggedIn: Access<User> = ({ req: { user } }) => {
  return Boolean(user);
};
