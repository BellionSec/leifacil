"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Calculator,
  DollarSign,
  AlertCircle,
  Briefcase,
  Scale,
  Building,
  Home,
  FileText,
  Calendar,
  BarChart,
  ChevronRight,
  Search,
} from "lucide-react"

// Importar calculadoras
import { calcularPensaoAlimenticia } from "@/lib/calculadoras/familia"
import { calcularJurosMora } from "@/lib/calculadoras/civel"

// Definição dos menus e submenus
const calculadoras = [
  {
    id: "civel",
    nome: "Área Cível",
    icon: <Scale className="h-5 w-5" />,
    submenus: [
      { id: "atualizacao-debito", nome: "Atualização de Débitos Judiciais" },
      { id: "juros-mora", nome: "Juros de Mora" },
      { id: "lucros-cessantes", nome: "Lucros Cessantes" },
      { id: "alugueis", nome: "Aluguéis em Ações de Despejo" },
      { id: "multa-contratual", nome: "Multas Contratuais" },
      { id: "inventario", nome: "Inventário e Partilha de Bens" },
    ],
  },
  {
    id: "trabalhista",
    nome: "Área Trabalhista",
    icon: <Briefcase className="h-5 w-5" />,
    submenus: [
      { id: "saldo-salario", nome: "Saldo de Salário" },
      { id: "aviso-previo", nome: "Aviso Prévio" },
      { id: "ferias", nome: "Férias Vencidas e Proporcionais" },
      { id: "decimo-terceiro", nome: "13º Salário Proporcional" },
      { id: "fgts", nome: "FGTS + Multa de 40%" },
      { id: "horas-extras", nome: "Horas Extras" },
      { id: "adicional-noturno", nome: "Adicional Noturno" },
      { id: "adicionais", nome: "Adicionais de Periculosidade e Insalubridade" },
      { id: "reenquadramento", nome: "Reenquadramento Salarial" },
      { id: "dano-moral-trabalhista", nome: "Dano Moral Trabalhista" },
    ],
  },
  {
    id: "previdenciaria",
    nome: "Área Previdenciária",
    icon: <Calendar className="h-5 w-5" />,
    submenus: [
      { id: "tempo-contribuicao", nome: "Tempo de Contribuição" },
      { id: "simulacao-aposentadoria", nome: "Simulação de Aposentadoria" },
      { id: "rmi", nome: "Renda Mensal Inicial (RMI)" },
      { id: "atrasados-beneficios", nome: "Atrasados em Benefícios" },
      { id: "conversao-tempo-especial", nome: "Conversão de Tempo Especial" },
    ],
  },
  {
    id: "tributaria",
    nome: "Área Tributária",
    icon: <BarChart className="h-5 w-5" />,
    submenus: [
      { id: "tributos-atraso", nome: "Tributos em Atraso" },
      { id: "parcelamento", nome: "Parcelamento (Refis)" },
      { id: "compensacao-creditos", nome: "Compensação de Créditos" },
      { id: "impostos-indevidos", nome: "Impostos Indevidos (Restituição)" },
    ],
  },
  {
    id: "familia",
    nome: "Família e Sucessões",
    icon: <Home className="h-5 w-5" />,
    submenus: [
      { id: "pensao-alimenticia", nome: "Pensão Alimentícia" },
      { id: "partilha-bens", nome: "Partilha de Bens e Meação" },
    ],
  },
  {
    id: "bancaria",
    nome: "Bancária e Financeira",
    icon: <Building className="h-5 w-5" />,
    submenus: [
      { id: "revisao-contratos", nome: "Revisão de Contratos Bancários" },
      { id: "anatocismo", nome: "Anatocismo (Juros Compostos)" },
      { id: "price-sac", nome: "Comparação Price x SAC" },
      { id: "juros-abusivos", nome: "Juros Abusivos" },
    ],
  },
  {
    id: "outros",
    nome: "Outros Cálculos",
    icon: <FileText className="h-5 w-5" />,
    submenus: [
      { id: "perdas-danos", nome: "Perdas e Danos" },
      { id: "fgts-correcao", nome: "FGTS (Correção)" },
      { id: "pericia-contabil", nome: "Perícia Contábil" },
      { id: "danos-morais", nome: "Danos Morais" },
    ],
  },
]

export default function CalculadoraJuridicaPage() {
  const [areaAtiva, setAreaAtiva] = useState("familia")
  const [calculadoraAtiva, setCalculadoraAtiva] = useState("pensao-alimenticia")
  const [searchTerm, setSearchTerm] = useState("")

  // Estados para Pensão Alimentícia
  const [rendaPagador, setRendaPagador] = useState("")
  const [numFilhos, setNumFilhos] = useState("")
  const [resultadoPensao, setResultadoPensao] = useState<number | null>(null)
  const [percentualPensao, setPercentualPensao] = useState<number | null>(null)

  // Estados para Juros de Mora
  const [valorCorrigido, setValorCorrigido] = useState("")
  const [tipoJuros, setTipoJuros] = useState("simples")
  const [taxaJuros, setTaxaJuros] = useState("0.01") // 1% ao mês
  const [mesesJuros, setMesesJuros] = useState("")
  const [resultadoJuros, setResultadoJuros] = useState<{
    valorCorrigido: number
    juros: number
    valorFinal: number
    taxa: number
    meses: number
    tipoJuros: string
  } | null>(null)

  // Estados para Danos Morais
  const [tipoDano, setTipoDano] = useState("")
  const [gravidade, setGravidade] = useState("")
  const [resultadoDano, setResultadoDano] = useState<number | null>(null)

  // Função para calcular pensão alimentícia
  const calcularPensao = () => {
    if (!rendaPagador || !numFilhos) return

    const renda = Number.parseFloat(rendaPagador.replace(/\D/g, "")) / 100
    const filhos = Number.parseInt(numFilhos)

    // Cálculo simplificado: 15% da renda para o primeiro filho + 5% para cada filho adicional
    const percentual = Math.min(15 + (filhos - 1) * 5, 50) / 100 // Máximo de 50%

    const resultado = calcularPensaoAlimenticia({
      rendaLiquida: renda,
      percentual: percentual,
      numFilhos: filhos,
    })

    setResultadoPensao(resultado.pensao)
    setPercentualPensao(percentual * 100)
  }

  // Função para calcular juros de mora
  const calcularJuros = () => {
    if (!valorCorrigido || !mesesJuros) return

    const valor = Number.parseFloat(valorCorrigido.replace(/\D/g, "")) / 100
    const taxa = Number.parseFloat(taxaJuros)
    const meses = Number.parseInt(mesesJuros)

    const resultado = calcularJurosMora({
      valorCorrigido: valor,
      taxa: taxa,
      meses: meses,
      tipoJuros: tipoJuros as "simples" | "compostos",
    })

    setResultadoJuros(resultado)
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

  // Filtrar calculadoras com base na pesquisa
  const calculadorasFiltradas = searchTerm
    ? calculadoras
        .map((area) => ({
          ...area,
          submenus: area.submenus.filter((submenu) => submenu.nome.toLowerCase().includes(searchTerm.toLowerCase())),
        }))
        .filter((area) => area.submenus.length > 0)
    : calculadoras

  // Renderizar o conteúdo da calculadora ativa
  const renderizarCalculadora = () => {
    switch (calculadoraAtiva) {
      case "pensao-alimenticia":
        return (
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
                    {formatarMoeda(Number.parseFloat(rendaPagador.replace(/\D/g, "")) / 100)}. O percentual aplicado foi
                    de aproximadamente {percentualPensao}% da renda.
                  </p>

                  <Alert className="mt-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertDescription className="text-amber-600 dark:text-amber-400">
                      Este é apenas um valor estimado. O valor real pode variar conforme decisão judicial.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "juros-mora":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Calculadora de Juros de Mora
              </CardTitle>
              <CardDescription>Calcule juros de mora simples ou compostos sobre um valor corrigido.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="valor-corrigido">Valor Corrigido (R$)</Label>
                <Input
                  id="valor-corrigido"
                  placeholder="Ex: 10.000,00"
                  value={valorCorrigido}
                  onChange={(e) => setValorCorrigido(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo-juros">Tipo de Juros</Label>
                  <Select value={tipoJuros} onValueChange={setTipoJuros}>
                    <SelectTrigger id="tipo-juros">
                      <SelectValue placeholder="Selecione o tipo de juros" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples">Juros Simples</SelectItem>
                      <SelectItem value="compostos">Juros Compostos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxa-juros">Taxa de Juros (% ao mês)</Label>
                  <Select value={taxaJuros} onValueChange={setTaxaJuros}>
                    <SelectTrigger id="taxa-juros">
                      <SelectValue placeholder="Selecione a taxa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.01">1% ao mês</SelectItem>
                      <SelectItem value="0.005">0,5% ao mês</SelectItem>
                      <SelectItem value="0.02">2% ao mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meses-juros">Período (meses)</Label>
                <Input
                  id="meses-juros"
                  type="number"
                  min="1"
                  placeholder="Ex: 12"
                  value={mesesJuros}
                  onChange={(e) => setMesesJuros(e.target.value)}
                />
              </div>

              <Button onClick={calcularJuros} className="w-full" disabled={!valorCorrigido || !mesesJuros}>
                Calcular Juros
              </Button>

              {resultadoJuros !== null && (
                <div className="mt-6 p-4 rounded-lg border bg-primary/5 animate-fade-in">
                  <h3 className="text-lg font-medium mb-2">Resultado</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Principal:</p>
                      <p className="font-medium">{formatarMoeda(resultadoJuros.valorCorrigido)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Juros:</p>
                      <p className="font-medium text-primary">{formatarMoeda(resultadoJuros.juros)}</p>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-lg font-bold text-center">
                      Valor Final: {formatarMoeda(resultadoJuros.valorFinal)}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Cálculo realizado utilizando juros {resultadoJuros.tipoJuros} de {resultadoJuros.taxa * 100}% ao
                    mês, durante {resultadoJuros.meses} {resultadoJuros.meses === 1 ? "mês" : "meses"}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "danos-morais":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
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
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className={cn("h-2 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40")}
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

                  <Alert className="mt-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertDescription className="text-amber-600 dark:text-amber-400">
                      Este é apenas um valor estimado baseado em jurisprudência. O valor real pode variar
                      significativamente conforme as circunstâncias específicas do caso e decisão judicial.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Calculator className="h-16 w-16 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">Calculadora em Desenvolvimento</h3>
            <p className="text-muted-foreground max-w-md">
              Esta calculadora está sendo implementada. Em breve você poderá realizar este cálculo jurídico.
            </p>
          </div>
        )
    }
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Calculadora Jurídica</h1>
              <p className="text-muted-foreground">
                Ferramentas para cálculos jurídicos em diversas áreas do Direito brasileiro.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar calculadora..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
              {/* Menu lateral */}
              <div className="md:border-r pr-0 md:pr-4">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={areaAtiva}
                    className="w-full"
                    value={areaAtiva}
                    onValueChange={setAreaAtiva}
                  >
                    {calculadorasFiltradas.map((area) => (
                      <AccordionItem key={area.id} value={area.id}>
                        <AccordionTrigger className="py-3 hover:no-underline">
                          <div className="flex items-center gap-2 text-base font-medium">
                            <span className="text-primary">{area.icon}</span>
                            {area.nome}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-1 pl-6">
                            {area.submenus.map((submenu) => (
                              <Button
                                key={submenu.id}
                                variant="ghost"
                                className={cn(
                                  "justify-start text-sm font-normal",
                                  calculadoraAtiva === submenu.id && "bg-muted font-medium",
                                )}
                                onClick={() => {
                                  setCalculadoraAtiva(submenu.id)
                                  setAreaAtiva(area.id)
                                }}
                              >
                                <ChevronRight
                                  className={cn(
                                    "mr-1 h-4 w-4",
                                    calculadoraAtiva === submenu.id ? "text-primary" : "text-muted-foreground",
                                  )}
                                />
                                {submenu.nome}
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </div>

              {/* Conteúdo da calculadora */}
              <div>
                {renderizarCalculadora()}

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>
                    Os cálculos apresentados são estimativas baseadas em fórmulas jurídicas e podem não refletir com
                    precisão valores determinados judicialmente. Consulte sempre um advogado para orientação específica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
