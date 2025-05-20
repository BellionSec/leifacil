import type React from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ResultadoCalculoProps {
  titulo: string
  valor: string
  descricao?: string
  alerta?: string
  children?: React.ReactNode
}

export function ResultadoCalculo({ titulo, valor, descricao, alerta, children }: ResultadoCalculoProps) {
  return (
    <div className="mt-6 p-4 rounded-lg border bg-primary/5 animate-fade-in">
      <h3 className="text-lg font-medium mb-2">{titulo}</h3>
      <div className="text-2xl font-bold text-primary mb-2">{valor}</div>

      {descricao && <p className="text-sm text-muted-foreground mb-4">{descricao}</p>}

      {children}

      {alerta && (
        <Alert className="mt-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-600 dark:text-amber-400">{alerta}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
