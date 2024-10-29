"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminorHasAccessToImages = void 0;
const isAdminorHasAccessToImages = () => async ({ req }) => {
    const user = req.user;
    if (!user)
        return false;
    if (user.roles.includes("admin"))
        return true;
    return {
        user: {
            equals: req.user.id,
        },
    };
};
exports.isAdminorHasAccessToImages = isAdminorHasAccessToImages;
