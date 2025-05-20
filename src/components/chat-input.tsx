"use client"
import type React from "react"

import { useState, type FormEvent, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSendMessageAction: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSendMessageAction, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessageAction(input)
      setInput("")
    }
  }

  // Ajustar altura do textarea automaticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px" // Altura mínima
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px` // Limitar altura máxima
    }
  }, [input])

  // Lidar com tecla Enter para enviar (Shift+Enter para nova linha)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        onSendMessageAction(input)
        setInput("")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t bg-background">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua dúvida jurídica..."
        className="min-h-[60px] max-h-[150px] flex-1 resize-none"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Enviar mensagem</span>
      </Button>
    </form>
  )
}
