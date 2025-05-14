"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, CreditCard } from "lucide-react"
import Link from "next/link"

export default function PerfilPage() {
  const { user, isLoaded } = useUser()

  // Plano atual simulado
  const currentPlan = {
    name: "Profissional",
    price: "R$ 99,90/mês",
    nextBilling: "15/06/2023",
    features: [
      "Consultas ilimitadas",
      "Acesso à legislação completa",
      "Respostas em tempo real",
      "Suporte prioritário",
      "Exportação de relatórios",
    ],
  }

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <div className="container py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-pulse">Carregando perfil...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Card className="w-full md:w-80">
                <CardHeader>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.imageUrl || "/placeholder.svg"} alt={user?.fullName || ""} />
                      <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <CardTitle>{user?.fullName}</CardTitle>
                      <CardDescription>{user?.primaryEmailAddress?.emailAddress}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Plano {currentPlan.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Próxima cobrança: {currentPlan.nextBilling}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Gerenciar Assinatura
                  </Button>
                </CardFooter>
              </Card>

              <div className="flex-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Seu Plano Atual</CardTitle>
                    <CardDescription>Gerencie sua assinatura e veja os detalhes do seu plano</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{currentPlan.name}</h3>
                        <p className="text-sm text-muted-foreground">{currentPlan.price}</p>
                      </div>
                      <Badge>Ativo</Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recursos incluídos:</h4>
                      <ul className="space-y-1">
                        {currentPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Cancelar Assinatura
                    </Button>
                    <Button className="w-full sm:w-auto">
                      <Link href="/planos">Alterar Plano</Link>             
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
