"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const server_1 = require("@trpc/server");
const get_payload_1 = require("../get-payload");
const account_credentials_validator_1 = require("../lib/Validators/account-credentials-validator");
const trpc_1 = require("./trpc");
exports.authRouter = (0, trpc_1.router)({
    createPayloadUser: trpc_1.publicProcedure
        .input(account_credentials_validator_1.AuthCredentialsValidator)
        .mutation(async ({ input }) => {
        const { email, password } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        const { docs: users } = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                },
            },
        });
        if (users.length !== 0)
            throw new server_1.TRPCError({ code: "CONFLICT" });
        const { docs } = await payload.create({
            collection: "users",
            data: {
                email,
                password,
                firstName: input.firstName,
                lastName: input.lastName,
                roles: input.role,
            },
        });
        return { success: true };
    }),
    signIn: trpc_1.publicProcedure
        .input(account_credentials_validator_1.AuthCredentialsValidator)
        .mutation(async ({ input, ctx }) => {
        const { email, password } = input;
        const { res } = ctx;
        const payload = await (0, get_payload_1.getPayloadClient)();
        try {
            await payload.login({
                collection: "users",
                data: {
                    email,
                    password,
                },
                res,
            });
            return { success: true };
        }
        catch (error) {
            console.log("Error signing in to payload", error);
            throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
        }
    }),
});
