import { Access } from "payload/config";

export const adminAndUser: Access = ({ req: { user } }) => {
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
