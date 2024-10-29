import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/Validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      const { docs } = await payload.create({
        collection: "users",
        data: {
          email,
          password,
          firstName: input.firstName!,
          lastName: input.lastName!,
          roles: input.role!,
        },
      });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayloadClient();

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
      } catch (error) {
        console.log("Error signing in to payload", error);
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
