"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAndUser = void 0;
const adminAndUser = ({ req: { user } }) => {
    if (user) {
        if (user.roles === "admin")
            return true;
        return {
            id: {
                equals: user.id,
            },
        };
    }
    return false;
};
exports.adminAndUser = adminAndUser;
