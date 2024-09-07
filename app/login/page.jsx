import { auth, signIn } from "@/app/auth";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function SignIn() {
  const session = await auth();
  if (session) {
    const { user } = session || {};
    const { email } = user || {};
    redirect(`/todo/${email}`);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <LoginForm />
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <div className="mt-4 text-center">
              <p>Or</p>
              <button
                type="submit"
                className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
