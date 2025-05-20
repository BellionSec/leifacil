"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ChatLoading } from "@/components/chat-loading"
import { Scale } from "lucide-react"

// Tipo para as mensagens
interface Message {
  role: "user" | "assistant"
  content: string
}

// Mensagens iniciais para demonstração
const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Olá! Sou a LeiFácil, sua assistente jurídica. Como posso ajudar você hoje?",
  },
]

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)

  // Função para simular o envio de mensagem para a IA
  const handleSendMessage = async (content: string) => {
    // Adiciona a mensagem do usuário
    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])

    // Simula o carregamento
    setIsLoading(true)

    // Simula a resposta da IA após um tempo
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: getSimulatedResponse(content),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  // Função para simular respostas da IA
  const getSimulatedResponse = (query: string): string => {
    // Respostas simuladas baseadas em palavras-chave
    if (query.toLowerCase().includes("contrato")) {
      return "De acordo com o Código Civil brasileiro, artigos 421 a 480, os contratos são acordos de vontade que criam, modificam ou extinguem direitos. Para ser válido, um contrato precisa ter: partes capazes, objeto lícito e forma prescrita ou não defesa em lei."
    } else if (query.toLowerCase().includes("divórcio")) {
      return "O divórcio no Brasil é regulamentado pela Lei nº 6.515/77 e pela Emenda Constitucional nº 66/2010. Atualmente, não há necessidade de separação prévia e pode ser realizado por via judicial ou extrajudicial (em cartório), quando não houver filhos menores ou incapazes."
    } else if (query.toLowerCase().includes("trabalhista") || query.toLowerCase().includes("trabalho")) {
      return "As relações de trabalho no Brasil são regidas pela CLT (Consolidação das Leis do Trabalho). Entre os direitos básicos estão: salário mínimo, férias remuneradas, 13º salário, FGTS, e jornada de trabalho de 8 horas diárias e 44 horas semanais."
    } else {
      return "Entendi sua dúvida. De acordo com a legislação brasileira, este é um tema que envolve diversos aspectos legais. Recomendo consultar os artigos específicos relacionados ao seu caso ou fornecer mais detalhes para que eu possa dar uma orientação mais precisa."
    }
  }

  return (
    <>
      <Navbar />
      <div className="container py-6 md:py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b bg-muted/30 p-4">
              <Scale className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold font-serif">LeiFácil Chat</h1>
            </div>
            <div className="h-[60vh] overflow-y-auto bg-background/50">
              {messages.map((message, index) => (
                 <ChatMessage
                  key={index}
                  message={message}
                  userImage={isLoaded ? user?.imageUrl : null}
                  userName={isLoaded ? user?.fullName : null}
                />
              ))}
              {isLoading && <ChatLoading />}
            </div>
            <ChatInput onSendMessageAction={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  )
}
