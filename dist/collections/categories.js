"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const isLoggedIn_1 = require("../access/isLoggedIn");
const isOwnComments_1 = require("../access/isOwnComments");
exports.Categories = {
    slug: "category",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isLoggedIn_1.isLoggedIn,
        create: isLoggedIn_1.isLoggedIn,
        update: isOwnComments_1.yourOwnCommentsOrCategory,
        delete: isOwnComments_1.yourOwnCommentsOrCategory,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
        },
    ],
};
