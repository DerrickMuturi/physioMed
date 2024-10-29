"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const isAdmin_1 = require("../access/isAdmin");
const isOwnComments_1 = require("../access/isOwnComments");
exports.Comments = {
    slug: "comments",
    access: {
        read: isOwnComments_1.yourOwnCommentsOrCategory,
        create: isOwnComments_1.yourOwnCommentsOrCategory,
        update: isOwnComments_1.yourOwnCommentsOrCategory,
        delete: isAdmin_1.isAdmin,
    },
    admin: {
        useAsTitle: "comment",
    },
    fields: [
        {
            name: "comment",
            type: "text",
            required: true,
        },
        {
            name: "post",
            type: "relationship",
            relationTo: "posts",
            hasMany: true,
            admin: {},
        },
    ],
};
