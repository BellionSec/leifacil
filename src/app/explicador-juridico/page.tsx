"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Loader2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ExplicadorJuridicoPage() {
  const [texto, setTexto] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [explicacao, setExplicacao] = useState<{ original: string; simples: string } | null>(null)

  const handleExplicar = () => {
    if (!texto.trim()) return

    setIsLoading(true)

    // Simulando o processamento da IA
    setTimeout(() => {
      setExplicacao({
        original: texto,
        simples: texto.includes("Art. 5º")
          ? "Este artigo da Constituição Federal garante que todos são iguais perante a lei, sem distinção de qualquer natureza. Isso significa que ninguém pode ser tratado de forma diferente por causa de sua raça, sexo, religião, opinião política ou qualquer outra característica pessoal. O artigo também garante vários direitos fundamentais como o direito à vida, à liberdade, à igualdade, à segurança e à propriedade."
          : "Este texto jurídico está explicando que você tem direito a receber uma compensação financeira (indenização) quando sofre algum dano causado por outra pessoa, seja esse dano material (prejuízo financeiro) ou moral (ofensa à sua dignidade ou reputação). Para conseguir essa indenização, você precisa provar que sofreu o dano e que ele foi causado pela ação ou omissão da outra pessoa.",
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Explicador Jurídico</h1>
              <p className="text-muted-foreground">
                Cole um artigo de lei ou texto jurídico para receber uma explicação em linguagem simples.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Texto Jurídico
                </CardTitle>
                <CardDescription>
                  Cole o texto jurídico ou artigo de lei que você deseja entender melhor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ex: Art. 5º da Constituição Federal ou qualquer texto jurídico que você queira entender..."
                  className="min-h-[150px] resize-none"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                />

                <Button onClick={handleExplicar} className="w-full" disabled={!texto.trim() || isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Explicar"
                  )}
                </Button>

                {isLoading && (
                  <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                {explicacao && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Texto Original</h3>
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <p className="text-sm">{explicacao.original}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Explicação Simplificada
                      </h3>
                      <div className="p-4 rounded-lg border bg-primary/5">
                        <p>{explicacao.simples}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-600">
                    Esta explicação não substitui aconselhamento jurídico profissional.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
