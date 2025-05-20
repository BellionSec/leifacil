"use client"

import { useState, useEffect } from "react"
import { format, parse, isAfter, isBefore } from "date-fns"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface SimpleDatePickerProps {
  className?: string
  value: string
  onChange: (value: string) => void
}

export function SimpleDatePicker({ className, value, onChange }: SimpleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Definir os limites de ano
  const anoMinimo = "2008-01-01"
  const anoAtual = new Date().getFullYear()
  const anoMaximo = `${anoAtual}-12-31`

  // Inicializar os valores de data a partir do valor recebido
  useEffect(() => {
    if (value) {
      const [start, end] = value.split(" - ")
      setStartDate(start || "")
      setEndDate(end || "")
    } else {
      setStartDate("")
      setEndDate("")
    }
  }, [value])

  // Função para validar as datas
  const validateDates = (start: string, end: string): boolean => {
    // Se não tiver ambas as datas, não há erro
    if (!start || !end) return true

    try {
      const startDateObj = new Date(start)
      const endDateObj = new Date(end)

      // Verificar se a data inicial é posterior à data final
      if (isAfter(startDateObj, endDateObj)) {
        setError("A data inicial não pode ser posterior à data final")
        return false
      }

      // Verificar se as datas estão dentro do intervalo permitido
      const minDateObj = new Date(anoMinimo)
      const maxDateObj = new Date(anoMaximo)

      if (isBefore(startDateObj, minDateObj)) {
        setError(`A data inicial não pode ser anterior a ${format(minDateObj, "dd-MM-yyyy")}`)
        return false
      }

      if (isAfter(endDateObj, maxDateObj)) {
        setError(`A data final não pode ser posterior a ${format(maxDateObj, "dd-MM-yyyy")}`)
        return false
      }

      // Se passou por todas as validações, limpar o erro
      setError(null)
      return true
    } catch (error) {
      setError("Formato de data inválido")
      return false
    }
  }

  // Função para atualizar as datas
  const updateDates = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)

    if (validateDates(start, end)) {
      if (start && end) {
        onChange(`${start} - ${end}`)
      } else if (start) {
        onChange(start)
      } else if (end) {
        onChange(end)
      } else {
        onChange("")
      }
    }
  }

  // Função para formatar a data para exibição no formato dd-MM-yyyy à dd-MM-yyyy
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "Selecione um período"

    const [startDate, endDate] = dateStr.split(" - ")

    if (startDate && endDate) {
      try {
        // Converter de yyyy-MM-dd para Date
        const startDateObj = parse(startDate, "yyyy-MM-dd", new Date())
        const endDateObj = parse(endDate, "yyyy-MM-dd", new Date())

        // Formatar para dd-MM-yyyy
        const formattedStartDate = format(startDateObj, "dd-MM-yyyy")
        const formattedEndDate = format(endDateObj, "dd-MM-yyyy")

        return `${formattedStartDate} à ${formattedEndDate}`
      } catch (error) {
        return dateStr
      }
    } else if (startDate) {
      try {
        const startDateObj = parse(startDate, "yyyy-MM-dd", new Date())
        return format(startDateObj, "dd-MM-yyyy")
      } catch (error) {
        return startDate
      }
    }

    return dateStr
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-red-500",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayDate(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-2 rounded-md text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Data inicial</label>
                <input
                  type="date"
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    error && "border-red-500",
                  )}
                  min={anoMinimo}
                  max={anoMaximo}
                  onChange={(e) => {
                    updateDates(e.target.value, endDate)
                  }}
                  value={startDate}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Data final</label>
                <input
                  type="date"
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    error && "border-red-500",
                  )}
                  min={anoMinimo}
                  max={anoMaximo}
                  onChange={(e) => {
                    updateDates(startDate, e.target.value)
                  }}
                  value={endDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStartDate("")
                  setEndDate("")
                  setError(null)
                  onChange("")
                  setIsOpen(false)
                }}
              >
                Limpar
              </Button>
              <Button
                onClick={() => {
                  if (!error) {
                    setIsOpen(false)
                  }
                }}
                disabled={!!error}
              >
                Aplicar
              </Button>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Períodos rápidos:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date()
                    const lastMonth = new Date()
                    lastMonth.setMonth(lastMonth.getMonth() - 1)

                    const formattedStart = format(lastMonth, "yyyy-MM-dd")
                    const formattedEnd = format(today, "yyyy-MM-dd")

                    updateDates(formattedStart, formattedEnd)
                    if (!error) {
                      setIsOpen(false)
                    }
                  }}
                >
                  Último mês
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date()
                    const lastYear = new Date()
                    lastYear.setFullYear(lastYear.getFullYear() - 1)

                    const formattedStart = format(lastYear, "yyyy-MM-dd")
                    const formattedEnd = format(today, "yyyy-MM-dd")

                    updateDates(formattedStart, formattedEnd)
                    if (!error) {
                      setIsOpen(false)
                    }
                  }}
                >
                  Último ano
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}
