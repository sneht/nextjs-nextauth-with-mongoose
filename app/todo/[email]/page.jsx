import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

async function Todo({ params }) {
  const { email } = params || {};
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return <div>{email}</div>;
}

export default Todo;
