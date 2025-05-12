"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Calendar, DollarSign, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export default function CalculadoraJuridicaPage() {
  // Estado para Pensão Alimentícia
  const [rendaPagador, setRendaPagador] = useState("")
  const [numFilhos, setNumFilhos] = useState("")
  const [resultadoPensao, setResultadoPensao] = useState<number | null>(null)

  // Estado para Correção Monetária
  const [valorOriginal, setValorOriginal] = useState("")
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [indice, setIndice] = useState("ipca")
  const [resultadoCorrecao, setResultadoCorrecao] = useState<number | null>(null)

  // Estado para Danos Morais
  const [tipoDano, setTipoDano] = useState("")
  const [gravidade, setGravidade] = useState("")
  const [resultadoDano, setResultadoDano] = useState<number | null>(null)

  // Função para calcular pensão alimentícia
  const calcularPensao = () => {
    if (!rendaPagador || !numFilhos) return

    const renda = Number.parseFloat(rendaPagador.replace(/\D/g, "")) / 100
    const filhos = Number.parseInt(numFilhos)

    // Cálculo simplificado: 15% da renda para o primeiro filho + 5% para cada filho adicional
    const percentual = Math.min(15 + (filhos - 1) * 5, 50) // Máximo de 50%
    const resultado = renda * (percentual / 100)

    setResultadoPensao(resultado)
  }

  // Função para calcular correção monetária
  const calcularCorrecao = () => {
    if (!valorOriginal || !dataInicial || !dataFinal) return

    const valor = Number.parseFloat(valorOriginal.replace(/\D/g, "")) / 100
    const dataIni = new Date(dataInicial)
    const dataFim = new Date(dataFinal)

    // Cálculo simplificado: simulando diferentes índices
    let taxa
    if (indice === "ipca") {
      taxa = 0.05 // 5% ao ano
    } else if (indice === "igpm") {
      taxa = 0.08 // 8% ao ano
    } else {
      taxa = 0.06 // 6% ao ano
    }

    const diferencaMeses =
      (dataFim.getFullYear() - dataIni.getFullYear()) * 12 + (dataFim.getMonth() - dataIni.getMonth())

    const resultado = valor * Math.pow(1 + taxa / 12, diferencaMeses)

    setResultadoCorrecao(resultado)
  }

  // Função para calcular danos morais
  const calcularDanosMorais = () => {
    if (!tipoDano || !gravidade) return

    let valorBase = 0

    // Valores base por tipo de dano
    switch (tipoDano) {
      case "ofensa":
        valorBase = 5000
        break
      case "acidente":
        valorBase = 10000
        break
      case "erro-medico":
        valorBase = 15000
        break
      case "negativacao":
        valorBase = 8000
        break
      default:
        valorBase = 5000
    }

    // Multiplicador por gravidade
    let multiplicador = 1
    switch (gravidade) {
      case "leve":
        multiplicador = 1
        break
      case "media":
        multiplicador = 2
        break
      case "grave":
        multiplicador = 3
        break
      default:
        multiplicador = 1
    }

    setResultadoDano(valorBase * multiplicador)
  }

  // Formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Calculadora Jurídica</h1>
              <p className="text-muted-foreground">
                Ferramentas para cálculos jurídicos comuns, como pensão alimentícia, correção monetária e danos morais.
              </p>
            </div>

            <Tabs defaultValue="pensao" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="pensao">Pensão Alimentícia</TabsTrigger>
                <TabsTrigger value="correcao">Correção Monetária</TabsTrigger>
                <TabsTrigger value="danos">Danos Morais</TabsTrigger>
              </TabsList>

              {/* Tab de Pensão Alimentícia */}
              <TabsContent value="pensao">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Calculadora de Pensão Alimentícia
                    </CardTitle>
                    <CardDescription>
                      Calcule o valor estimado de pensão alimentícia com base na renda e número de filhos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="renda-pagador">Renda Mensal do Pagador (R$)</Label>
                        <Input
                          id="renda-pagador"
                          placeholder="Ex: 5.000,00"
                          value={rendaPagador}
                          onChange={(e) => setRendaPagador(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="num-filhos">Número de Filhos</Label>
                        <Input
                          id="num-filhos"
                          type="number"
                          min="1"
                          max="10"
                          placeholder="Ex: 2"
                          value={numFilhos}
                          onChange={(e) => setNumFilhos(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button onClick={calcularPensao} className="w-full" disabled={!rendaPagador || !numFilhos}>
                      Calcular Pensão
                    </Button>

                    {resultadoPensao !== null && (
                      <div className="mt-6 p-4 rounded-lg border bg-primary/5 animate-fade-in">
                        <h3 className="text-lg font-medium mb-2">Resultado</h3>
                        <div className="text-2xl font-bold text-primary mb-2">{formatarMoeda(resultadoPensao)}</div>
                        <p className="text-sm text-muted-foreground">
                          Este valor foi calculado considerando {numFilhos} filho(s) e uma renda mensal de{" "}
                          {formatarMoeda(Number.parseFloat(rendaPagador.replace(/\D/g, "")) / 100)}. O percentual
                          aplicado foi de aproximadamente {Math.min(15 + (Number.parseInt(numFilhos) - 1) * 5, 50)}% da
                          renda.
                        </p>

                        <Alert className="mt-4 bg-amber-50 border-amber-200">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-600">
                            Este é apenas um valor estimado. O valor real pode variar conforme decisão judicial.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab de Correção Monetária */}
              <TabsContent value="correcao">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Calculadora de Correção Monetária
                    </CardTitle>
                    <CardDescription>
                      Calcule a correção monetária de um valor com base em diferentes índices.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="valor-original">Valor Original (R$)</Label>
                      <Input
                        id="valor-original"
                        placeholder="Ex: 10.000,00"
                        value={valorOriginal}
                        onChange={(e) => setValorOriginal(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="data-inicial">Data Inicial</Label>
                        <Input
                          id="data-inicial"
                          type="date"
                          value={dataInicial}
                          onChange={(e) => setDataInicial(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="data-final">Data Final</Label>
                        <Input
                          id="data-final"
                          type="date"
                          value={dataFinal}
                          onChange={(e) => setDataFinal(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="indice">Índice de Correção</Label>
                      <Select value={indice} onValueChange={setIndice}>
                        <SelectTrigger id="indice">
                          <SelectValue placeholder="Selecione um índice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ipca">IPCA</SelectItem>
                          <SelectItem value="igpm">IGPM</SelectItem>
                          <SelectItem value="selic">SELIC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={calcularCorrecao}
                      className="w-full"
                      disabled={!valorOriginal || !dataInicial || !dataFinal}
                    >
                      Calcular Correção
                    </Button>

                    {resultadoCorrecao !== null && (
                      <div className="mt-6 p-4 rounded-lg border bg-primary/5 animate-fade-in">
                        <h3 className="text-lg font-medium mb-2">Resultado</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Valor Original:</p>
                            <p className="font-medium">
                              {formatarMoeda(Number.parseFloat(valorOriginal.replace(/\D/g, "")) / 100)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Valor Corrigido:</p>
                            <p className="text-xl font-bold text-primary">{formatarMoeda(resultadoCorrecao)}</p>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{
                              width: `${Math.min((resultadoCorrecao / (Number.parseFloat(valorOriginal.replace(/\D/g, "")) / 100)) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Cálculo realizado utilizando o índice {indice.toUpperCase()} no período de{" "}
                          {new Date(dataInicial).toLocaleDateString("pt-BR")} a{" "}
                          {new Date(dataFinal).toLocaleDateString("pt-BR")}.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab de Danos Morais */}
              <TabsContent value="danos">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Calculadora de Danos Morais
                    </CardTitle>
                    <CardDescription>
                      Estime o valor de indenização por danos morais com base no tipo e gravidade.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="tipo-dano">Tipo de Dano</Label>
                      <Select value={tipoDano} onValueChange={setTipoDano}>
                        <SelectTrigger id="tipo-dano">
                          <SelectValue placeholder="Selecione o tipo de dano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ofensa">Ofensa à honra/imagem</SelectItem>
                          <SelectItem value="acidente">Acidente com lesão</SelectItem>
                          <SelectItem value="erro-medico">Erro médico</SelectItem>
                          <SelectItem value="negativacao">Negativação indevida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gravidade">Gravidade</Label>
                      <Select value={gravidade} onValueChange={setGravidade}>
                        <SelectTrigger id="gravidade">
                          <SelectValue placeholder="Selecione a gravidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leve">Leve</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="grave">Grave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={calcularDanosMorais} className="w-full" disabled={!tipoDano || !gravidade}>
                      Estimar Valor
                    </Button>

                    {resultadoDano !== null && (
                      <div className="mt-6 p-4 rounded-lg border bg-primary/5 animate-fade-in">
                        <h3 className="text-lg font-medium mb-2">Estimativa de Indenização</h3>
                        <div className="text-2xl font-bold text-primary mb-4">{formatarMoeda(resultadoDano)}</div>

                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium">Faixa de valores possíveis:</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{formatarMoeda(resultadoDano * 0.7)}</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div
                                className={cn(
                                  "h-2 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40",
                                )}
                              ></div>
                            </div>
                            <span className="text-sm">{formatarMoeda(resultadoDano * 1.3)}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Esta estimativa considera um dano do tipo "
                          {tipoDano === "ofensa"
                            ? "ofensa à honra/imagem"
                            : tipoDano === "acidente"
                              ? "acidente com lesão"
                              : tipoDano === "erro-medico"
                                ? "erro médico"
                                : "negativação indevida"}
                          " com gravidade "{gravidade === "leve" ? "leve" : gravidade === "media" ? "média" : "grave"}".
                        </p>

                        <Alert className="mt-4 bg-amber-50 border-amber-200">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-600">
                            Este é apenas um valor estimado baseado em jurisprudência. O valor real pode variar
                            significativamente conforme as circunstâncias específicas do caso e decisão judicial.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
