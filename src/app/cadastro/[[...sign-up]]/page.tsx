import { SignUp } from "@clerk/nextjs";

export default function CreateAccountPage() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <SignUp />
    </div>
  );
}
