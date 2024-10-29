"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = ({ req: { user } }) => {
    var _a;
    return (_a = Boolean(user === null || user === void 0 ? void 0 : user.roles["admin"])) !== null && _a !== void 0 ? _a : false;
};
exports.isAdmin = isAdmin;
