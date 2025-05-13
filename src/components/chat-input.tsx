"use client"

import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t bg-background">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua dúvida jurídica..."
        className="min-h-[60px] flex-1 resize-none"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Enviar mensagem</span>
      </Button>
    </form>
  )
}
