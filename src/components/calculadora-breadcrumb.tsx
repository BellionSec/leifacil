import { ChevronRight } from "lucide-react"

interface CalculadoraBreadcrumbProps {
  area: string
  calculadora: string
}

export function CalculadoraBreadcrumb({ area, calculadora }: CalculadoraBreadcrumbProps) {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-4">
      <span>Calculadoras</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span>{area}</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="font-medium text-foreground">{calculadora}</span>
    </div>
  )
}
