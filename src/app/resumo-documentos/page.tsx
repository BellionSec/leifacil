"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, File, X, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ResumoDocumentosPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resumo, setResumo] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      const fileType = droppedFile.type

      if (
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(droppedFile)
      } else {
        alert("Por favor, envie apenas arquivos PDF ou DOC/DOCX.")
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const fileType = selectedFile.type

      if (
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile)
      } else {
        alert("Por favor, envie apenas arquivos PDF ou DOC/DOCX.")
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setResumo(null)
  }

  const handleGerarResumo = () => {
    if (!file) return

    setIsLoading(true)

    // Simulando o processamento da IA
    setTimeout(() => {
      setResumo(
        "Este documento é um contrato de prestação de serviços entre as partes A e B, com vigência de 12 meses a partir da data de assinatura. Os principais pontos são:\n\n" +
          "1. Valor mensal de R$ 2.500,00 pelos serviços descritos no Anexo I\n" +
          "2. Prazo de pagamento até o 5º dia útil de cada mês\n" +
          "3. Multa de 2% por atraso no pagamento\n" +
          "4. Possibilidade de rescisão com aviso prévio de 30 dias\n" +
          "5. Cláusula de confidencialidade com validade de 2 anos após o término do contrato\n\n" +
          "Em linguagem simples, este é um contrato onde uma empresa contrata serviços de outra por R$ 2.500 mensais. O contrato dura 1 ano, mas pode ser cancelado com 30 dias de aviso. Há multa por atraso de pagamento e as informações trocadas devem ser mantidas em segredo mesmo após o fim do contrato.",
      )
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Resumo Jurídico de Documentos</h1>
              <p className="text-muted-foreground">
                Ideal para quem precisa entender rapidamente um contrato, decisão judicial ou petição.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Upload de Documento
                </CardTitle>
                <CardDescription>
                  Faça upload de um arquivo PDF ou DOC para gerar um resumo jurídico em linguagem simples.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!file ? (
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                      isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Arraste e solte seu arquivo aqui</h3>
                      <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
                      <p className="text-xs text-muted-foreground mt-2">Formatos aceitos: PDF, DOC, DOCX</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {!resumo && !isLoading && (
                      <Button onClick={handleGerarResumo} className="w-full">
                        Gerar Resumo
                      </Button>
                    )}

                    {isLoading && (
                      <div className="flex flex-col items-center gap-4 p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Analisando documento e gerando resumo...</p>
                      </div>
                    )}

                    {resumo && (
                      <div className="mt-4 animate-fade-in">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <h3 className="text-lg font-medium">Resumo Gerado</h3>
                        </div>
                        <div className="p-4 rounded-lg border bg-muted/30">
                          <div className="prose prose-sm max-w-none">
                            {resumo.split("\n").map((line, index) => (
                              <p key={index} className={line === "" ? "my-4" : ""}>
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <p>Os documentos são processados com segurança e não são armazenados permanentemente.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
