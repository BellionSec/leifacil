import { SignIn  } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <SignIn />
    </div>
  );
}
