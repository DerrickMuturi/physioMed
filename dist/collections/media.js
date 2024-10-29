"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const isAdminOrHasAccessToImages_1 = require("../access/isAdminOrHasAccessToImages");
exports.Media = {
    slug: "media",
    access: {
        read: (0, isAdminOrHasAccessToImages_1.isAdminorHasAccessToImages)(),
        create: (0, isAdminOrHasAccessToImages_1.isAdminorHasAccessToImages)(),
        update: (0, isAdminOrHasAccessToImages_1.isAdminorHasAccessToImages)(),
        delete: (0, isAdminOrHasAccessToImages_1.isAdminorHasAccessToImages)(),
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
