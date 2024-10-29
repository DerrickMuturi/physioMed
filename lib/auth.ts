import { UserJSON } from "@clerk/express";
import { trpc } from "../trpc/client";

export async function createUserInPayload(userData: UserJSON) {
  const { mutate: signUp } = trpc.auth.createPayloadUser.useMutation();
  try {
    signUp({
      firstName: userData.first_name!,
      lastName: userData.last_name!,
      email: userData.email_addresses[0].email_address,
      password: userData.id,
      role: ["author"],
    });

    return { success: true };
  } catch (error) {
    console.log("Error creating payload user", error);
    return { success: false };
  }
}

export async function signInPayloadUser(email: string, password: string) {
  const { mutate: signIn } = trpc.auth.signIn.useMutation();
  try {
    signIn({
      email,
      password,
    });
    return { success: true };
  } catch (error) {
    console.log("Could not sign in payload user", error);
    return { success: false };
  }
}
