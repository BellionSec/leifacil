import { SignUp } from "@clerk/nextjs";

export default function CreateAccountPage() {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <SignUp />
    </div>
  );
}
