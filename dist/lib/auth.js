"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserInPayload = createUserInPayload;
exports.signInPayloadUser = signInPayloadUser;
const client_1 = require("../trpc/client");
async function createUserInPayload(userData) {
    const { mutate: signUp } = client_1.trpc.auth.createPayloadUser.useMutation();
    try {
        signUp({
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email_addresses[0].email_address,
            password: userData.id,
            role: ["author"],
        });
        return { success: true };
    }
    catch (error) {
        console.log("Error creating payload user", error);
        return { success: false };
    }
}
async function signInPayloadUser(email, password) {
    const { mutate: signIn } = client_1.trpc.auth.signIn.useMutation();
    try {
        signIn({
            email,
            password,
        });
        return { success: true };
    }
    catch (error) {
        console.log("Could not sign in payload user", error);
        return { success: false };
    }
}
