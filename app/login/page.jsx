import { auth, signIn } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();
  if (session) {
    const { user } = session || {};
    const { email } = user || {};
    redirect(`/todo/${email}`);
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
