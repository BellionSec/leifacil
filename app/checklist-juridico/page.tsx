"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronRight, FileCheck, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// Tipos para o fluxo do checklist
type Step = {
  id: string
  question: string
  options: Option[]
}

type Option = {
  id: string
  text: string
  nextStep: string | null
}

type Result = {
  title: string
  description: string
  documents: string[]
  steps: string[]
  urgency: "baixa" | "media" | "alta"
  needLawyer: boolean
}

export default function ChecklistJuridicoPage() {
  const [currentStep, setCurrentStep] = useState<string>("objetivo")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Result | null>(null)

  // Definição dos passos do checklist
  const steps: Record<string, Step> = {
    objetivo: {
      id: "objetivo",
      question: "Qual é o seu objetivo principal?",
      options: [
        { id: "empresa", text: "Abrir uma empresa", nextStep: "tipo-empresa" },
        { id: "divorcio", text: "Processo de divórcio", nextStep: "tipo-divorcio" },
        { id: "trabalhista", text: "Questão trabalhista", nextStep: "tipo-trabalhista" },
        { id: "consumidor", text: "Problema com produto/serviço", nextStep: "tipo-consumidor" },
      ],
    },
    "tipo-empresa": {
      id: "tipo-empresa",
      question: "Que tipo de empresa você deseja abrir?",
      options: [
        { id: "mei", text: "MEI (Microempreendedor Individual)", nextStep: "documentos-empresa" },
        { id: "me", text: "ME (Microempresa)", nextStep: "documentos-empresa" },
        { id: "eireli", text: "EIRELI (Empresa Individual)", nextStep: "documentos-empresa" },
        { id: "ltda", text: "Sociedade Limitada", nextStep: "documentos-empresa" },
      ],
    },
    "documentos-empresa": {
      id: "documentos-empresa",
      question: "Você já possui estes documentos?",
      options: [
        { id: "sim", text: "Sim, tenho todos os documentos necessários", nextStep: "urgencia" },
        { id: "parcial", text: "Tenho alguns documentos", nextStep: "urgencia" },
        { id: "nao", text: "Não tenho os documentos necessários", nextStep: "urgencia" },
      ],
    },
    "tipo-divorcio": {
      id: "tipo-divorcio",
      question: "Qual a situação do divórcio?",
      options: [
        { id: "consensual", text: "Consensual (ambos concordam)", nextStep: "filhos-divorcio" },
        { id: "litigioso", text: "Litigioso (há discordância)", nextStep: "filhos-divorcio" },
      ],
    },
    "filhos-divorcio": {
      id: "filhos-divorcio",
      question: "Existem filhos menores de idade?",
      options: [
        { id: "sim", text: "Sim", nextStep: "bens-divorcio" },
        { id: "nao", text: "Não", nextStep: "bens-divorcio" },
      ],
    },
    "bens-divorcio": {
      id: "bens-divorcio",
      question: "Existem bens a serem divididos?",
      options: [
        { id: "sim", text: "Sim, temos bens em comum", nextStep: "urgencia" },
        { id: "poucos", text: "Sim, mas são poucos bens", nextStep: "urgencia" },
        { id: "nao", text: "Não temos bens em comum", nextStep: "urgencia" },
      ],
    },
    "tipo-trabalhista": {
      id: "tipo-trabalhista",
      question: "Qual o tipo de questão trabalhista?",
      options: [
        { id: "demissao", text: "Demissão (justa causa ou sem justa causa)", nextStep: "documentos-trabalhista" },
        { id: "verbas", text: "Verbas não pagas (horas extras, férias, etc)", nextStep: "documentos-trabalhista" },
        { id: "assedio", text: "Assédio moral ou sexual", nextStep: "documentos-trabalhista" },
        { id: "acidente", text: "Acidente de trabalho", nextStep: "documentos-trabalhista" },
      ],
    },
    "documentos-trabalhista": {
      id: "documentos-trabalhista",
      question: "Você possui documentos que comprovam a relação de trabalho?",
      options: [
        { id: "sim", text: "Sim, tenho carteira assinada e outros documentos", nextStep: "urgencia" },
        { id: "parcial", text: "Tenho alguns documentos ou provas", nextStep: "urgencia" },
        { id: "nao", text: "Não tenho documentos formais", nextStep: "urgencia" },
      ],
    },
    "tipo-consumidor": {
      id: "tipo-consumidor",
      question: "Qual o problema com o produto ou serviço?",
      options: [
        { id: "defeito", text: "Produto com defeito", nextStep: "tentativa-resolucao" },
        { id: "nao-entregue", text: "Produto não entregue", nextStep: "tentativa-resolucao" },
        { id: "servico-ruim", text: "Serviço mal prestado", nextStep: "tentativa-resolucao" },
        { id: "cobranca", text: "Cobrança indevida", nextStep: "tentativa-resolucao" },
      ],
    },
    "tentativa-resolucao": {
      id: "tentativa-resolucao",
      question: "Você já tentou resolver diretamente com a empresa?",
      options: [
        { id: "sim", text: "Sim, mas não obtive resposta", nextStep: "urgencia" },
        { id: "parcial", text: "Sim, mas a solução não foi satisfatória", nextStep: "urgencia" },
        { id: "nao", text: "Não tentei ainda", nextStep: "urgencia" },
      ],
    },
    urgencia: {
      id: "urgencia",
      question: "Qual a urgência para resolver esta questão?",
      options: [
        { id: "baixa", text: "Baixa (posso esperar alguns meses)", nextStep: null },
        { id: "media", text: "Média (preciso resolver nas próximas semanas)", nextStep: null },
        { id: "alta", text: "Alta (preciso resolver imediatamente)", nextStep: null },
      ],
    },
  }

  // Função para avançar para o próximo passo
  const handleSelectOption = (optionId: string, nextStep: string | null) => {
    // Salvar resposta atual
    setAnswers({ ...answers, [currentStep]: optionId })

    // Se for o último passo, gerar resultado
    if (nextStep === null) {
      generateResult({ ...answers, [currentStep]: optionId })
    } else {
      // Avançar para o próximo passo
      setCurrentStep(nextStep)
    }
  }

  // Função para reiniciar o checklist
  const handleReset = () => {
    setCurrentStep("objetivo")
    setAnswers({})
    setResult(null)
  }

  // Função para gerar o resultado com base nas respostas
  const generateResult = (finalAnswers: Record<string, string>) => {
    const result: Result = {
      title: "",
      description: "",
      documents: [],
      steps: [],
      urgency: finalAnswers.urgencia as "baixa" | "media" | "alta",
      needLawyer: false,
    }

    // Lógica para gerar resultado com base no objetivo principal
    switch (finalAnswers.objetivo) {
      case "empresa":
        result.title = "Abertura de Empresa"
        result.description = `Você deseja abrir uma ${
          finalAnswers["tipo-empresa"] === "mei"
            ? "MEI (Microempreendedor Individual)"
            : finalAnswers["tipo-empresa"] === "me"
              ? "ME (Microempresa)"
              : finalAnswers["tipo-empresa"] === "eireli"
                ? "EIRELI (Empresa Individual)"
                : "Sociedade Limitada"
        }.`

        result.documents = [
          "RG e CPF dos sócios",
          "Comprovante de endereço",
          "Contrato Social (exceto MEI)",
          "Consulta prévia de local",
          "Consulta prévia de nome empresarial",
        ]

        result.steps = [
          "Consulta de viabilidade na prefeitura",
          "Registro na Junta Comercial",
          "Inscrição no CNPJ",
          "Inscrição Estadual (se necessário)",
          "Alvará de funcionamento",
          "Inscrição Municipal",
        ]

        result.needLawyer = finalAnswers["tipo-empresa"] !== "mei"
        break

      case "divorcio":
        result.title = "Processo de Divórcio"
        result.description = `Você deseja um divórcio ${
          finalAnswers["tipo-divorcio"] === "consensual" ? "consensual" : "litigioso"
        }${finalAnswers["filhos-divorcio"] === "sim" ? " com filhos menores" : " sem filhos menores"}${
          finalAnswers["bens-divorcio"] === "sim"
            ? " e com divisão de bens"
            : finalAnswers["bens-divorcio"] === "poucos"
              ? " e com poucos bens a dividir"
              : " e sem bens a dividir"
        }.`

        result.documents = [
          "Certidão de casamento",
          "RG e CPF dos cônjuges",
          "Certidão de nascimento dos filhos (se houver)",
          "Documentos dos bens (se houver)",
          "Comprovantes de renda",
        ]

        result.steps = [
          finalAnswers["tipo-divorcio"] === "consensual" && finalAnswers["filhos-divorcio"] === "nao"
            ? "Divórcio em cartório (se consensual e sem filhos menores)"
            : "Petição inicial de divórcio",
          "Audiência de conciliação",
          finalAnswers["filhos-divorcio"] === "sim" ? "Definição de guarda e pensão alimentícia" : "",
          finalAnswers["bens-divorcio"] !== "nao" ? "Partilha de bens" : "",
          "Sentença judicial",
          "Averbação no registro civil",
        ].filter((step) => step !== "")

        result.needLawyer = true
        break

      case "trabalhista":
        result.title = "Questão Trabalhista"
        result.description = `Você tem uma questão trabalhista relacionada a ${
          finalAnswers["tipo-trabalhista"] === "demissao"
            ? "demissão"
            : finalAnswers["tipo-trabalhista"] === "verbas"
              ? "verbas não pagas"
              : finalAnswers["tipo-trabalhista"] === "assedio"
                ? "assédio moral ou sexual"
                : "acidente de trabalho"
        }.`

        result.documents = [
          "Carteira de Trabalho",
          "Contrato de trabalho",
          "Holerites/contracheques",
          "Comprovantes de pagamento",
          finalAnswers["tipo-trabalhista"] === "verbas" ? "Controle de ponto" : "",
          finalAnswers["tipo-trabalhista"] === "acidente" ? "Comunicação de Acidente de Trabalho (CAT)" : "",
          finalAnswers["tipo-trabalhista"] === "acidente" ? "Atestados médicos" : "",
          finalAnswers["tipo-trabalhista"] === "assedio" ? "Provas do assédio (mensagens, e-mails, testemunhas)" : "",
        ].filter((doc) => doc !== "")

        result.steps = [
          "Tentativa de acordo com empregador",
          "Consulta com advogado trabalhista",
          "Ajuizamento de reclamação trabalhista",
          "Audiência de conciliação",
          "Audiência de instrução e julgamento",
          "Sentença",
        ]

        result.needLawyer = true
        break

      case "consumidor":
        result.title = "Problema de Consumo"
        result.description = `Você tem um problema de consumo relacionado a ${
          finalAnswers["tipo-consumidor"] === "defeito"
            ? "produto com defeito"
            : finalAnswers["tipo-consumidor"] === "nao-entregue"
              ? "produto não entregue"
              : finalAnswers["tipo-consumidor"] === "servico-ruim"
                ? "serviço mal prestado"
                : "cobrança indevida"
        }.`

        result.documents = [
          "Nota fiscal ou comprovante de compra",
          "Contrato de prestação de serviço (se aplicável)",
          "Comprovantes de pagamento",
          "Protocolos de atendimento",
          "Fotos ou vídeos do produto (se aplicável)",
          "Troca de mensagens com a empresa",
        ]

        result.steps = [
          finalAnswers["tentativa-resolucao"] === "nao" ? "Contato direto com a empresa (SAC)" : "",
          "Reclamação no Procon",
          "Reclamação no site consumidor.gov.br",
          "Ação no Juizado Especial Cível (pequenas causas)",
          "Audiência de conciliação",
          "Sentença",
        ].filter((step) => step !== "")

        result.needLawyer =
          finalAnswers["tipo-consumidor"] === "servico-ruim" ||
          (finalAnswers["tipo-consumidor"] === "cobranca" && finalAnswers.urgencia === "alta")
        break
    }

    setResult(result)
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Checklist Jurídico Inteligente</h1>
              <p className="text-muted-foreground">
                Responda algumas perguntas para descobrir quais documentos e passos você precisa para sua questão
                jurídica.
              </p>
            </div>

            {!result ? (
              <Card>
                <CardHeader>
                  <CardTitle>{steps[currentStep].question}</CardTitle>
                  <CardDescription>Selecione a opção que melhor se aplica à sua situação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {steps[currentStep].options.map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        className="flex justify-between items-center h-auto py-4 px-6 text-left"
                        onClick={() => handleSelectOption(option.id, option.nextStep)}
                      >
                        <span>{option.text}</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <Button variant="ghost" onClick={handleReset} disabled={currentStep === "objetivo"}>
                    Reiniciar
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Passo {Object.keys(answers).length + 1} de {Object.keys(steps).length}
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{result.title}</CardTitle>
                        <CardDescription className="mt-1">{result.description}</CardDescription>
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium",
                          result.urgency === "baixa"
                            ? "bg-green-100 text-green-800"
                            : result.urgency === "media"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800",
                        )}
                      >
                        Urgência {result.urgency === "baixa" ? "Baixa" : result.urgency === "media" ? "Média" : "Alta"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-primary" />
                        Documentos Necessários
                      </h3>
                      <ul className="space-y-2">
                        {result.documents.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Etapas do Processo
                      </h3>
                      <ol className="space-y-4">
                        {result.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1 pt-0.5">
                              <p>{step}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {result.needLawyer && (
                      <div className="p-4 rounded-lg border bg-amber-50 border-amber-200">
                        <div className="flex gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-amber-800 mb-1">Recomendação de Advogado</h4>
                            <p className="text-sm text-amber-700">
                              Para este caso, é recomendável a assistência de um advogado especializado. A complexidade
                              jurídica exige orientação profissional para garantir seus direitos.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline" onClick={handleReset}>
                      Reiniciar Checklist
                    </Button>
                    <Button>Salvar Resultado</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
