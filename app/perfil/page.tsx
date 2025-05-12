"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, CreditCard, User, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PerfilPage() {
  const { user, isLoaded } = useUser()
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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

  const handleSaveProfile = () => {
    setIsSaving(true)
    // Simulação de salvamento
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
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
                <Tabs defaultValue="perfil">
                  <TabsList className="mb-4">
                    <TabsTrigger value="perfil">
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </TabsTrigger>
                    <TabsTrigger value="plano">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Plano
                    </TabsTrigger>
                    <TabsTrigger value="seguranca">
                      <Shield className="h-4 w-4 mr-2" />
                      Segurança
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="perfil">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informações do Perfil</CardTitle>
                        <CardDescription>Atualize suas informações pessoais</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {showSuccess && (
                          <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-600">Sucesso</AlertTitle>
                            <AlertDescription className="text-green-600">
                              Suas informações foram atualizadas com sucesso.
                            </AlertDescription>
                          </Alert>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Nome</Label>
                            <Input id="firstName" defaultValue={user?.firstName || ""} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Sobrenome</Label>
                            <Input id="lastName" defaultValue={user?.lastName || ""} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea id="bio" placeholder="Conte um pouco sobre você..." />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveProfile} disabled={isSaving}>
                          {isSaving ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="plano">
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
                        <Button className="w-full sm:w-auto">Atualizar Plano</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="seguranca">
                    <Card>
                      <CardHeader>
                        <CardTitle>Segurança</CardTitle>
                        <CardDescription>Gerencie suas configurações de segurança</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Autenticação de dois fatores</AlertTitle>
                          <AlertDescription>Proteja sua conta com autenticação de dois fatores.</AlertDescription>
                        </Alert>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha Atual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova Senha</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Atualizar Senha</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
