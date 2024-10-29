"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const adminAndUser_1 = require("../access/adminAndUser");
const isAdmin_1 = require("../access/isAdmin");
exports.Users = {
    slug: "users",
    auth: {
        verify: {},
    },
    access: {
        read: adminAndUser_1.adminAndUser,
        create: isAdmin_1.isAdmin,
        update: adminAndUser_1.adminAndUser,
        delete: isAdmin_1.isAdmin,
    },
    admin: {
        hidden: ({ user }) => user.role !== "admin",
        defaultColumns: ["id"],
        useAsTitle: "firstName",
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "firstName",
                    type: "text",
                    required: true,
                },
                {
                    name: "lastName",
                    type: "text",
                    required: true,
                },
            ],
        },
        {
            name: "roles",
            defaultValue: "user",
            required: true,
            hasMany: true,
            saveToJWT: true,
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "Author", value: "author" },
                { label: "User", value: "user" },
            ],
        },
        {
            name: "post",
            saveToJWT: true,
            type: "relationship",
            relationTo: "posts",
            hasMany: true,
            admin: {
                condition: ({ roles }) => roles && !roles.includes("admin"),
            },
        },
        {
            name: "profile",
            type: "upload",
            relationTo: "media",
        },
    ],
    timestamps: true,
};
