import { SignIn } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "rounded-xl border shadow-sm",
              headerTitle: "font-serif text-2xl",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "font-medium",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footerAction: "text-muted-foreground",
              formFieldLabel: "text-foreground",
            },
          }}
        />
      </div>
    </>
  )
}
