import { CollectionConfig } from "payload/types";
import { isAdminorHasAccessToImages } from "../access/isAdminOrHasAccessToImages";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: isAdminorHasAccessToImages(),
    create: isAdminorHasAccessToImages(),
    update: isAdminorHasAccessToImages(),
    delete: isAdminorHasAccessToImages(),
  },
  upload: {
    staticURL: "/media",
    staticDir: "public/media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "center",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "center",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "center",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};
