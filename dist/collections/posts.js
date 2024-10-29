"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const adminAndAuthor_1 = require("../access/adminAndAuthor");
const isAdmin_1 = require("../access/isAdmin");
exports.Posts = {
    slug: "posts",
    access: {
        read: adminAndAuthor_1.isAdminOrAuthor,
        delete: isAdmin_1.isAdmin,
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
