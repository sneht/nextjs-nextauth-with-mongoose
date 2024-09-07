"use server";

import { signIn } from "../auth";

export async function loginAction(prevState, data) {
  try {
    const input = Object.fromEntries(data);
    const { email_address, password } = input;
    const loginResponse = await signIn("credentials", {
      email_address,
      password,
      redirect: false,
    });
    console.log("loginResponse", loginResponse);
    return loginResponse;
  } catch (error) {
    return error;
  }
}
