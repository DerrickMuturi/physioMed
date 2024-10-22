import { Access } from "payload/config";

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles.includes("admin"));
};
