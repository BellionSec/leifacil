// Interfaces para os parâmetros dos cálculos
export interface PerdasDanosParams {
  gastos: number[]
  indiceIPCA: number
  meses: number
}

export interface FGTSParams {
  salariosMensais: number[]
  indice: number
  meses: number
}

export interface PericiaContabilParams {
  ativos: number[]
  passivos: number[]
  taxaDesconto?: number
}

// Funções de cálculo para a área de outros (perícias, FGTS, lucros)

/**
 * Calcula perdas e danos
 */
export function calcularPerdasDanos(params: PerdasDanosParams) {
  const { gastos, indiceIPCA, meses } = params

  // Calcular perda total
  const perda = gastos.reduce((sum, gasto) => sum + gasto, 0)

  // Calcular correção
  const corrigido = perda * Math.pow(1 + indiceIPCA, meses)

  // Calcular diferença
  const diferenca = corrigido - perda

  return {
    gastos,
    perda,
    indiceIPCA,
    meses,
    corrigido,
    diferenca,
  }
}


/**
 * Calcula perícia contábil
 */
export function calcularPericiaContabil(params: PericiaContabilParams) {
  const { ativos, passivos, taxaDesconto } = params

  // Calcular patrimônio líquido
  const totalAtivos = ativos.reduce((sum, valor) => sum + valor, 0)
  const totalPassivos = passivos.reduce((sum, valor) => sum + valor, 0)
  const patrimonioLiquido = totalAtivos - totalPassivos

  // Calcular valor presente (se aplicável)
  const valorPresente = taxaDesconto ? patrimonioLiquido / (1 + taxaDesconto) : null

  return {
    ativos,
    passivos,
    totalAtivos,
    totalPassivos,
    patrimonioLiquido,
    taxaDesconto,
    valorPresente,
  }
}
