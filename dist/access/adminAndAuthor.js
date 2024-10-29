"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrAuthor = void 0;
const isAdminOrAuthor = ({ req: { user } }) => {
    var _a;
    if (user) {
        if (user.roles.includes("admin"))
            return true;
        if (user.roles.includes("author") && ((_a = user.posts) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return {
                or: [
                    {
                        site: {
                            in: user.sites,
                        },
                    },
                    {
                        site: {
                            exists: false,
                        },
                    },
                ],
            };
        }
    }
    return {
        or: [
            {
                status: {
                    equals: "published",
                },
            },
        ],
    };
};
exports.isAdminOrAuthor = isAdminOrAuthor;
