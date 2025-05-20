import { format, differenceInMonths } from "date-fns"

// Interfaces para os parâmetros dos cálculos
export interface AtualizacaoDebitoParams {
  valorOriginal: number
  dataInicial: Date
  dataCitacao: Date
  dataFinal: Date
  indiceIPCA: Record<string, number> // Índices mensais do IPCA
  indiceSelic: Record<string, number> // Índices mensais da Selic
}

export interface JurosMoraParams {
  valorCorrigido: number
  taxa: number // 0.01 para 1% ao mês
  meses: number
  tipoJuros: "simples" | "compostos"
  usarSelic?: boolean
  indiceSelic?: Record<string, number>
}

export interface LucrosCessantesParams {
  receitaTotal: number
  diasOperacao: number
  despesaTotal: number
  diasParalisacao: number
  dataInicial: Date
  dataFinal: Date
  indiceIPCA: Record<string, number>
  indiceSelic: Record<string, number>
}

export interface AlugueisParams {
  aluguelOriginal: number
  indiceContratual: number // Percentual do índice contratual (ex: 0.1 para 10%)
  meses: number
  taxaJuros: number // Taxa de juros mensal (ex: 0.01 para 1%)
}

export interface MultaContratualParams {
  valorPrincipal: number
  percentualMulta: number // Percentual da multa (ex: 0.1 para 10%)
  indiceCorrecao: number
  meses: number
  taxaJuros: number
}

export interface InventarioParams {
  valoresAtivos: number[]
  valoresPassivos: number[]
  aliquotaITCMD: number // Alíquota do ITCMD (ex: 0.04 para 4%)
}

// Funções de cálculo para a área cível

/**
 * Calcula a atualização de débitos judiciais
 */
export function calcularAtualizacaoDebito(params: AtualizacaoDebitoParams) {
  const { valorOriginal, dataInicial, dataCitacao, dataFinal, indiceIPCA, indiceSelic } = params

  // Calcular fator IPCA acumulado até a data da citação
  const mesesPreCitacao = differenceInMonths(dataCitacao, dataInicial)
  let fatorIPCA = 1

  for (let i = 0; i < mesesPreCitacao; i++) {
    const dataAtual = new Date(dataInicial)
    dataAtual.setMonth(dataInicial.getMonth() + i)
    const chave = format(dataAtual, "yyyy-MM")

    if (indiceIPCA[chave]) {
      fatorIPCA *= 1 + indiceIPCA[chave]
    }
  }

  // Calcular valor corrigido pré-citação
  const valorCorrigidoPre = valorOriginal * fatorIPCA

  // Calcular juros Selic pós-citação
  const mesesPosCitacao = differenceInMonths(dataFinal, dataCitacao)
  let fatorSelic = 1

  for (let i = 0; i < mesesPosCitacao; i++) {
    const dataAtual = new Date(dataCitacao)
    dataAtual.setMonth(dataCitacao.getMonth() + i)
    const chave = format(dataAtual, "yyyy-MM")

    if (indiceSelic[chave]) {
      fatorSelic *= 1 + indiceSelic[chave]
    }
  }

  // Calcular valor final
  const valorFinal = valorCorrigidoPre * fatorSelic

  return {
    valorOriginal,
    fatorIPCA,
    valorCorrigidoPre,
    fatorSelic,
    valorFinal,
    mesesPreCitacao,
    mesesPosCitacao,
  }
}

/**
 * Calcula juros de mora
 */
export function calcularJurosMora(params: JurosMoraParams) {
  const { valorCorrigido, taxa, meses, tipoJuros, usarSelic, indiceSelic } = params

  let juros = 0
  let valorFinal = 0

  if (tipoJuros === "simples") {
    // Juros simples
    juros = valorCorrigido * taxa * meses
    valorFinal = valorCorrigido + juros
  } else {
    // Juros compostos
    if (usarSelic && indiceSelic) {
      // Usar taxa Selic
      let fator = 1
      const dataInicial = new Date()

      for (let i = 0; i < meses; i++) {
        const dataAtual = new Date(dataInicial)
        dataAtual.setMonth(dataInicial.getMonth() + i)
        const chave = format(dataAtual, "yyyy-MM")

        if (indiceSelic[chave]) {
          fator *= 1 + indiceSelic[chave]
        } else {
          fator *= 1 + taxa
        }
      }

      valorFinal = valorCorrigido * fator
      juros = valorFinal - valorCorrigido
    } else {
      // Usar taxa fixa
      valorFinal = valorCorrigido * Math.pow(1 + taxa, meses)
      juros = valorFinal - valorCorrigido
    }
  }

  return {
    valorCorrigido,
    juros,
    valorFinal,
    taxa,
    meses,
    tipoJuros,
  }
}

/**
 * Calcula indenizações por lucros cessantes
 */
export function calcularLucrosCessantes(params: LucrosCessantesParams) {
  const { receitaTotal, diasOperacao, despesaTotal, diasParalisacao, dataInicial, dataFinal, indiceIPCA, indiceSelic } =
    params

  // Calcular lucro médio diário
  const receitaMediaDiaria = receitaTotal / diasOperacao
  const despesaMediaDiaria = despesaTotal / diasOperacao
  const lucroMedioDiario = receitaMediaDiaria - despesaMediaDiaria

  // Calcular lucro cessante bruto
  const lucroCessanteBruto = lucroMedioDiario * diasParalisacao

  // Calcular correção monetária
  const meses = differenceInMonths(dataFinal, dataInicial)
  let fatorIPCA = 1

  for (let i = 0; i < meses; i++) {
    const dataAtual = new Date(dataInicial)
    dataAtual.setMonth(dataInicial.getMonth() + i)
    const chave = format(dataAtual, "yyyy-MM")

    if (indiceIPCA[chave]) {
      fatorIPCA *= 1 + indiceIPCA[chave]
    }
  }

  const lucroCessanteCorrigido = lucroCessanteBruto * fatorIPCA

  // Calcular juros
  let fatorSelic = 1

  for (let i = 0; i < meses; i++) {
    const dataAtual = new Date(dataInicial)
    dataAtual.setMonth(dataInicial.getMonth() + i)
    const chave = format(dataAtual, "yyyy-MM")

    if (indiceSelic[chave]) {
      fatorSelic *= 1 + indiceSelic[chave]
    }
  }

  const lucroCessanteFinal = lucroCessanteCorrigido * fatorSelic

  return {
    receitaMediaDiaria,
    despesaMediaDiaria,
    lucroMedioDiario,
    lucroCessanteBruto,
    lucroCessanteCorrigido,
    lucroCessanteFinal,
    fatorIPCA,
    fatorSelic,
    meses,
  }
}

/**
 * Calcula aluguéis em ações de despejo
 */
export function calcularAlugueis(params: AlugueisParams) {
  const { aluguelOriginal, indiceContratual, meses, taxaJuros } = params

  const resultadosMensais = []
  let totalGeral = 0

  for (let m = 1; m <= meses; m++) {
    // Aluguel corrigido para o mês m
    const aluguelCorrigido = aluguelOriginal * Math.pow(1 + indiceContratual, m)

    // Juros para o mês m
    const juros = aluguelCorrigido * taxaJuros * m

    // Total para o mês m
    const total = aluguelCorrigido + juros

    resultadosMensais.push({
      mes: m,
      aluguelCorrigido,
      juros,
      total,
    })

    totalGeral += total
  }

  return {
    resultadosMensais,
    totalGeral,
    aluguelOriginal,
    indiceContratual,
    meses,
    taxaJuros,
  }
}

/**
 * Calcula multas contratuais
 */
export function calcularMultaContratual(params: MultaContratualParams) {
  const { valorPrincipal, percentualMulta, indiceCorrecao, meses, taxaJuros } = params

  // Calcular multa
  const multa = valorPrincipal * percentualMulta

  // Calcular correção
  const multaCorrigida = multa * Math.pow(1 + indiceCorrecao, meses)

  // Calcular juros
  const juros = multaCorrigida * taxaJuros * meses

  // Calcular valor final
  const valorFinal = multaCorrigida + juros

  return {
    valorPrincipal,
    percentualMulta,
    multa,
    multaCorrigida,
    juros,
    valorFinal,
    indiceCorrecao,
    meses,
    taxaJuros,
  }
}

/**
 * Calcula inventário e partilha de bens
 */
export function calcularInventario(params: InventarioParams) {
  const { valoresAtivos, valoresPassivos, aliquotaITCMD } = params

  // Calcular patrimônio líquido
  const totalAtivos = valoresAtivos.reduce((sum, valor) => sum + valor, 0)
  const totalPassivos = valoresPassivos.reduce((sum, valor) => sum + valor, 0)
  const patrimonioLiquido = totalAtivos - totalPassivos

  // Calcular meação
  const meacao = 0.5 * patrimonioLiquido

  // Calcular bens hereditários
  const bensHereditarios = patrimonioLiquido - meacao

  // Calcular ITCMD
  const itcmd = aliquotaITCMD * bensHereditarios

  return {
    totalAtivos,
    totalPassivos,
    patrimonioLiquido,
    meacao,
    bensHereditarios,
    itcmd,
    aliquotaITCMD,
  }
}
