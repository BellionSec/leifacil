"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Landmark, ArrowRight, FileText, Loader2 } from "lucide-react"
import { SimpleDatePicker } from "@/components/simple-date-picker"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Tipo para os resultados de jurisprudência
interface Jurisprudencia {
  id: string
  titulo: string
  ementa: string
  tribunal: string
  data: string
}

export default function BuscadorJurisprudenciasPage() {
  // Estados para os filtros
  const [palavraChave, setPalavraChave] = useState("")
  const [tribunal, setTribunal] = useState("")
  const [dateRange, setDateRange] = useState("")

  // Estados para os resultados e paginação
  const [resultados, setResultados] = useState<Jurisprudencia[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [buscaRealizada, setBuscaRealizada] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  // Função para realizar a busca
  const handleBuscar = () => {
    setIsLoading(true)
    setBuscaRealizada(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      // Dados simulados para demonstração
      const dadosSimulados: Jurisprudencia[] = palavraChave
        ? [
            {
              id: "1",
              titulo: "Recurso Especial nº 1.234.567/SP",
              ementa:
                "DIREITO CIVIL. RESPONSABILIDADE CIVIL. DANO MORAL. INSCRIÇÃO INDEVIDA EM CADASTRO DE INADIMPLENTES. QUANTUM INDENIZATÓRIO. RAZOABILIDADE.",
              tribunal: "STJ",
              data: "2023-05-15",
            },
            {
              id: "2",
              titulo: "Agravo de Instrumento nº 2.345.678/RJ",
              ementa:
                "DIREITO PROCESSUAL CIVIL. TUTELA DE URGÊNCIA. PROBABILIDADE DO DIREITO E PERIGO DE DANO DEMONSTRADOS. REQUISITOS PREENCHIDOS.",
              tribunal: "TJ-RJ",
              data: "2023-06-22",
            },
            {
              id: "3",
              titulo: "Apelação Cível nº 3.456.789/MG",
              ementa:
                "DIREITO DO CONSUMIDOR. FALHA NA PRESTAÇÃO DE SERVIÇO. DANO MORAL CONFIGURADO. VALOR DA INDENIZAÇÃO. PRINCÍPIOS DA RAZOABILIDADE E PROPORCIONALIDADE.",
              tribunal: "TJ-MG",
              data: "2023-04-10",
            },
            {
              id: "4",
              titulo: "Recurso Extraordinário nº 4.567.890/DF",
              ementa:
                "DIREITO CONSTITUCIONAL. REPERCUSSÃO GERAL RECONHECIDA. DIREITO À SAÚDE. FORNECIMENTO DE MEDICAMENTOS. RESPONSABILIDADE SOLIDÁRIA DOS ENTES FEDERATIVOS.",
              tribunal: "STF",
              data: "2023-03-05",
            },
            {
              id: "5",
              titulo: "Habeas Corpus nº 5.678.901/PR",
              ementa:
                "DIREITO PENAL E PROCESSUAL PENAL. PRISÃO PREVENTIVA. AUSÊNCIA DOS REQUISITOS LEGAIS. CONSTRANGIMENTO ILEGAL CONFIGURADO. ORDEM CONCEDIDA.",
              tribunal: "TJ-PR",
              data: "2023-07-18",
            },
            {
              id: "6",
              titulo: "Mandado de Segurança nº 6.789.012/RS",
              ementa:
                "DIREITO ADMINISTRATIVO. CONCURSO PÚBLICO. NOMEAÇÃO. DIREITO SUBJETIVO. CANDIDATO APROVADO DENTRO DO NÚMERO DE VAGAS.",
              tribunal: "TJ-RS",
              data: "2023-02-28",
            },
            {
              id: "7",
              titulo: "Recurso Ordinário nº 7.890.123/BA",
              ementa:
                "DIREITO DO TRABALHO. RESCISÃO INDIRETA. ATRASO REITERADO NO PAGAMENTO DE SALÁRIOS. CONFIGURAÇÃO.",
              tribunal: "TRT-5",
              data: "2023-01-20",
            },
          ]
        : []

      // Filtragem por tribunal, se selecionado
      let resultadosFiltrados =
        tribunal && tribunal !== "all" ? dadosSimulados.filter((item) => item.tribunal === tribunal) : dadosSimulados

      // Filtragem por data, se selecionada
      if (dateRange) {
        const [dataInicio, dataFim] = dateRange.split(" - ")
        if (dataInicio && dataFim) {
          const inicio = new Date(dataInicio)
          const fim = new Date(dataFim)
          resultadosFiltrados = resultadosFiltrados.filter((item) => {
            const dataItem = new Date(item.data)
            return dataItem >= inicio && dataItem <= fim
          })
        }
      }

      setResultados(resultadosFiltrados)
      setIsLoading(false)
      setPaginaAtual(1)
    }, 1500)
  }

  // Cálculo para paginação
  const totalPaginas = Math.ceil(resultados.length / itensPorPagina)
  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const indiceFinal = indiceInicial + itensPorPagina
  const resultadosPaginados = resultados.slice(indiceInicial, indiceFinal)

  // Funções para navegação entre páginas
  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1)
    }
  }

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1)
    }
  }

  // Função para formatar a data para exibição
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Buscador de Jurisprudências</h1>
              <p className="text-muted-foreground">Pesquise decisões judiciais de diversos tribunais brasileiros</p>
            </div>

            {/* Formulário de busca */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Filtros de Busca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label htmlFor="palavra-chave" className="text-sm font-medium">
                      Palavra-chave
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="palavra-chave"
                        placeholder="Ex: dano moral, habeas corpus, pensão alimentícia..."
                        className="pl-9"
                        value={palavraChave}
                        onChange={(e) => setPalavraChave(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="tribunal" className="text-sm font-medium">
                        Tribunal
                      </label>
                      <div className="relative">
                        <Select value={tribunal} onValueChange={setTribunal}>
                          <SelectTrigger id="tribunal" className="pl-9">
                            <Landmark className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Selecione um tribunal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos os tribunais</SelectItem>
                            <SelectItem value="STF">Supremo Tribunal Federal (STF)</SelectItem>
                            <SelectItem value="STJ">Superior Tribunal de Justiça (STJ)</SelectItem>
                            <SelectItem value="TST">Tribunal Superior do Trabalho (TST)</SelectItem>
                            <SelectItem value="TJ-SP">Tribunal de Justiça de SP (TJ-SP)</SelectItem>
                            <SelectItem value="TJ-RJ">Tribunal de Justiça do RJ (TJ-RJ)</SelectItem>
                            <SelectItem value="TJ-MG">Tribunal de Justiça de MG (TJ-MG)</SelectItem>
                            <SelectItem value="TJ-RS">Tribunal de Justiça do RS (TJ-RS)</SelectItem>
                            <SelectItem value="TJ-PR">Tribunal de Justiça do PR (TJ-PR)</SelectItem>
                            <SelectItem value="TRT-5">TRT da 5ª Região (TRT-5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Período</label>
                      <SimpleDatePicker value={dateRange} onChange={setDateRange} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleBuscar} className="w-full" disabled={isLoading || !palavraChave.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      Buscar Jurisprudências
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Resultados da busca */}
            {buscaRealizada && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Resultados da Busca</h2>
                  {resultados.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {resultados.length} {resultados.length === 1 ? "resultado encontrado" : "resultados encontrados"}
                    </p>
                  )}
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Buscando jurisprudências...</p>
                  </div>
                ) : resultados.length === 0 ? (
                  <Card className="bg-muted/30">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">Nenhum resultado encontrado</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        Tente modificar os termos da busca ou remover alguns filtros para encontrar mais resultados.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {resultadosPaginados.map((jurisprudencia) => (
                      <Card key={jurisprudencia.id} className="animate-fade-in">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{jurisprudencia.titulo}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Ver detalhes</span>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground mb-4">{jurisprudencia.ementa}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {jurisprudencia.tribunal}
                            </div>
                            <div className="bg-muted px-2 py-1 rounded-full">{formatarData(jurisprudencia.data)}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Paginação */}
                    {totalPaginas > 1 && (
                      <Pagination className="mt-6">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={irParaPaginaAnterior}
                              className={paginaAtual === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <span className="text-sm">
                              Página {paginaAtual} de {totalPaginas}
                            </span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              onClick={irParaProximaPagina}
                              className={
                                paginaAtual === totalPaginas ? "pointer-events-none opacity-50" : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
