"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();

  if (!email)
    return {
      error: "The email value must not be empty.",
    };
  if (!password)
    return {
      error: "The password value must not be empty.",
    };

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    } else return { error: "Unknown error" };
  }
  redirect("/");
}
