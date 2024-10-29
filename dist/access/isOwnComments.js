"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yourOwnCommentsOrCategory = void 0;
const yourOwnCommentsOrCategory = ({ req: { user } }) => {
    if (user.roles.includes("admin"))
        return true;
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id,
        },
    };
};
exports.yourOwnCommentsOrCategory = yourOwnCommentsOrCategory;
