import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

export default async function Page() {
  const session = await caller.auth.session();

  if (session.user) redirect("/");

  return <SignUpView />;
}
