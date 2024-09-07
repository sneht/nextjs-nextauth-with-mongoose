"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginAction } from "./action";
import { useFormState } from "react-dom";

function LoginForm() {
  const formSchema = z.object({
    email_address: z.string().email(),
    password: z.string(),
  });

  const initialState = {
    email_address: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialState,
    mode: "all",
  });

  const [state, formAction] = useFormState(loginAction, null);

  useEffect(() => {
    // formAction(state);
    console.log("state", state);
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="loginEmail"
          className="block text-gray-700 font-medium mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="loginEmail"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...form.register("email_address")}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="loginPassword"
          className="block text-gray-700 font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="loginPassword"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...form.register("password")}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
