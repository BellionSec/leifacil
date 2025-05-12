import { Loader2 } from "lucide-react"

export function ChatLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Consultando a legislação...</p>
      </div>
    </div>
  )
}
