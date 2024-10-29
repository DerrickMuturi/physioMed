"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const isLoggedIn = ({ req: { user } }) => {
    return Boolean(user);
};
exports.isLoggedIn = isLoggedIn;
