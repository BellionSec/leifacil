// Interfaces para os parâmetros dos cálculos
export interface PensaoAlimenticiaParams {
  rendaLiquida: number
  percentual: number // 0.2 para 20%
  numFilhos?: number
}

export interface PartilhaBensParams {
  ativos: number[]
  passivos: number[]
  possuiConjuge: boolean
  numHerdeiros: number
}

// Funções de cálculo para a área de família e sucessões

/**
 * Calcula pensão alimentícia
 */
export function calcularPensaoAlimenticia(params: PensaoAlimenticiaParams) {
  const { rendaLiquida, percentual, numFilhos } = params

  // Calcular pensão
  const pensao = rendaLiquida * percentual

  // Calcular pensão por filho (se aplicável)
  const pensaoPorFilho = numFilhos ? pensao / numFilhos : null

  return {
    rendaLiquida,
    percentual,
    numFilhos,
    pensao,
    pensaoPorFilho,
  }
}

/**
 * Calcula partilha de bens e meação
 */
export function calcularPartilhaBens(params: PartilhaBensParams) {
  const { ativos, passivos, possuiConjuge, numHerdeiros } = params

  // Calcular patrimônio líquido
  const totalAtivos = ativos.reduce((sum, valor) => sum + valor, 0)
  const totalPassivos = passivos.reduce((sum, valor) => sum + valor, 0)
  const patrimonioLiquido = totalAtivos - totalPassivos

  // Calcular meação (se houver cônjuge)
  const meacao = possuiConjuge ? 0.5 * patrimonioLiquido : 0

  // Calcular restante para partilha
  const restante = patrimonioLiquido - meacao

  // Calcular quotas dos herdeiros
  const quotaHerdeiro = numHerdeiros > 0 ? restante / numHerdeiros : 0

  return {
    totalAtivos,
    totalPassivos,
    patrimonioLiquido,
    possuiConjuge,
    meacao,
    restante,
    numHerdeiros,
    quotaHerdeiro,
  }
}
