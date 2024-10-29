import { CollectionConfig } from "payload/types";
import { isAdminOrAuthor } from "../access/adminAndAuthor";
import { isAdmin } from "../access/isAdmin";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    read: isAdminOrAuthor,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "title",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "type",
      type: "select",
      defaultValue: "blog",
      options: [
        { label: "blog", value: "blog" },
        { label: "article", value: "article" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "published", value: "published" },
        { label: "draft", value: "draft" },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "category",
      hasMany: true,
      admin: {
        allowCreate: true,
      },
    },
    {
      name: "cover",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
      admin: {
        allowCreate: true,
      },
    },
  ],
};
