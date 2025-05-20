
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
  isLoading?: boolean
  userImage?: string | null
  userName?: string | null
}


export function ChatMessage({ message, isLoading, userImage, userName }: ChatMessageProps) {
  const isUser = message.role === "user"

  
  // Obter as iniciais do nome do usuário para o fallback do avatar
  const getUserInitials = () => {
    if (!userName) return "U"
    const names = userName.split(" ")
    if (names.length === 1) return names[0].charAt(0)
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`
  }

  return (
    <div className={cn("flex w-full gap-3 p-4", isUser ? "justify-end" : "justify-start", isLoading && "opacity-70")}>
      {!isUser && (
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">LF</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
      {isUser && (
        <Avatar>
         {userImage ? (
            <AvatarImage src={userImage || "/placeholder.svg"} alt={userName || "Usuário"} />
          ) : (
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          )}
        </Avatar>
      )}
    </div>
  )
}
