import { User } from "../payload-typed";
import { Access } from "payload/config";

export const adminAndUser: Access<User> = ({ req: { user } }) => {
  if (user) {
    if (user.roles === "admin") return true;

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
