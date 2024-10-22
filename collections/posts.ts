import { CollectionConfig } from "payload/types";
import { isAdminOrAuthor } from "../access/adminAndAuthor";
import { isAdmin } from "../access/isAdmin";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    read: isAdminOrAuthor,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};
