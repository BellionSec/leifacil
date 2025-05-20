// Interfaces para os parâmetros dos cálculos
export interface SaldoSalarioParams {
  salarioBase: number
  diasTrabalhados: number
}

export interface AvisoPrevioParams {
  salarioBase: number
  anosServico: number
}

export interface FeriasParams {
  salarioBase: number
  mesesAquisitivo: number
  possuiVencidas: boolean
}

export interface DecimoTerceiroParams {
  salarioBase: number
  mesesTrabalhadosNoAno: number
}

export interface FGTSParamsTrabalhista {
  salariosMensais: number[]
  demissaoSemJustaCausa: boolean
  indice?: number        // índice de correção (opcional)
  meses?: number         // quantidade de meses para correção (opcional)
}


export interface HorasExtrasParams {
  salarioBase: number
  horasMensais: number
  percentualAdicional: number // 0.5 para 50%, 1.0 para 100%
  quantidadeHE: number
}

export interface AdicionalNoturnoParams {
  horaDiurnaEquivalente: number
  quantidadeHoras: number
}

export interface AdicionaisParams {
  salarioBase: number
  salarioMinimo: number
  possuiPericulosidade: boolean
  possuiInsalubridade: boolean
  grauInsalubridade: "minimo" | "medio" | "maximo" // 0.1, 0.2 ou 0.4
}

export interface ReenquadramentoParams {
  salarioDevidoMes: number[]
  salarioPagoMes: number[]
}

export interface DanoMoralTrabalhistaParams {
  valorSentenciado: number
  indiceIPCA: number
  meses: number
  taxaSelic: number
}

// Funções de cálculo para a área trabalhista

/**
 * Calcula o saldo de salário
 */
export function calcularSaldoSalario(params: SaldoSalarioParams) {
  const { salarioBase, diasTrabalhados } = params

  const saldo = (salarioBase / 30) * diasTrabalhados

  return {
    salarioBase,
    diasTrabalhados,
    saldo,
  }
}

/**
 * Calcula o aviso prévio
 */
export function calcularAvisoPrevio(params: AvisoPrevioParams) {
  const { salarioBase, anosServico } = params

  // Cálculo dos dias de aviso prévio (30 dias + 3 dias por ano de serviço)
  const diasAviso = Math.min(30 + 3 * anosServico, 90) // Limitado a 90 dias

  const aviso = (salarioBase / 30) * diasAviso

  return {
    salarioBase,
    anosServico,
    diasAviso,
    aviso,
  }
}

/**
 * Calcula férias vencidas e proporcionais
 */
export function calcularFerias(params: FeriasParams) {
  const { salarioBase, mesesAquisitivo, possuiVencidas } = params

  // Férias vencidas (se houver)
  const feriasVencidas = possuiVencidas ? salarioBase * (1 + 1 / 3) : 0

  // Férias proporcionais
  const feriasProporcionais = (salarioBase / 12) * mesesAquisitivo * (1 + 1 / 3)

  // Total
  const totalFerias = feriasVencidas + feriasProporcionais

  return {
    salarioBase,
    mesesAquisitivo,
    possuiVencidas,
    feriasVencidas,
    feriasProporcionais,
    totalFerias,
  }
}

/**
 * Calcula o 13º salário proporcional
 */
export function calcularDecimoTerceiro(params: DecimoTerceiroParams) {
  const { salarioBase, mesesTrabalhadosNoAno } = params

  const decimoTerceiro = (salarioBase / 12) * mesesTrabalhadosNoAno

  return {
    salarioBase,
    mesesTrabalhadosNoAno,
    decimoTerceiro,
  }
}

/**
 * Calcula o FGTS, multa de 40% e correção monetária
 */
export function calcularFGTSTrabalhista(params: FGTSParamsTrabalhista) {
  const { salariosMensais, demissaoSemJustaCausa, indice = 0, meses = 0 } = params

  // Calcular FGTS acumulado (8% de cada salário)
  const fgtsAcumulado = salariosMensais.reduce((sum, salario) => sum + 0.08 * salario, 0)

  // Calcular correção monetária (se aplicável)
  const fgtsCorrigido = indice > 0 ? fgtsAcumulado * Math.pow(1 + indice, meses) : fgtsAcumulado
  const diferenca = fgtsCorrigido - fgtsAcumulado

  // Calcular multa de 40% (se demissão sem justa causa)
  const multaFGTS = demissaoSemJustaCausa ? 0.4 * fgtsCorrigido : 0

  // Total
  const totalFGTS = fgtsCorrigido + multaFGTS

  return {
    salariosMensais,
    demissaoSemJustaCausa,
    fgtsAcumulado,
    fgtsCorrigido,
    diferenca,
    multaFGTS,
    totalFGTS,
  }
}

/**
 * Calcula horas extras
 */
export function calcularHorasExtras(params: HorasExtrasParams) {
  const { salarioBase, horasMensais, percentualAdicional, quantidadeHE } = params

  // Valor da hora normal
  const horaNormal = salarioBase / horasMensais

  // Valor da hora extra
  const valorHE = horaNormal * (1 + percentualAdicional)

  // Total de horas extras
  const totalHE = valorHE * quantidadeHE

  return {
    salarioBase,
    horasMensais,
    horaNormal,
    percentualAdicional,
    valorHE,
    quantidadeHE,
    totalHE,
  }
}

/**
 * Calcula adicional noturno
 */
export function calcularAdicionalNoturno(params: AdicionalNoturnoParams) {
  const { horaDiurnaEquivalente, quantidadeHoras } = params

  // Valor da hora noturna (20% a mais que a hora diurna)
  const valorNoturno = horaDiurnaEquivalente * 1.2

  // Total do adicional noturno
  const totalNoturno = valorNoturno * quantidadeHoras

  return {
    horaDiurnaEquivalente,
    valorNoturno,
    quantidadeHoras,
    totalNoturno,
  }
}

/**
 * Calcula adicionais de periculosidade e insalubridade
 */
export function calcularAdicionais(params: AdicionaisParams) {
  const { salarioBase, salarioMinimo, possuiPericulosidade, possuiInsalubridade, grauInsalubridade } = params

  // Adicional de periculosidade (30% do salário base)
  const adicionalPerigo = possuiPericulosidade ? salarioBase * 0.3 : 0

  // Adicional de insalubridade (varia conforme o grau)
  let percentualInsalubridade = 0
  if (possuiInsalubridade) {
    switch (grauInsalubridade) {
      case "minimo":
        percentualInsalubridade = 0.1 // 10%
        break
      case "medio":
        percentualInsalubridade = 0.2 // 20%
        break
      case "maximo":
        percentualInsalubridade = 0.4 // 40%
        break
    }
  }

  const adicionalInsalubridade = possuiInsalubridade ? salarioMinimo * percentualInsalubridade : 0

  // Total de adicionais
  const totalAdicionais = adicionalPerigo + adicionalInsalubridade

  return {
    salarioBase,
    salarioMinimo,
    possuiPericulosidade,
    possuiInsalubridade,
    grauInsalubridade,
    percentualInsalubridade,
    adicionalPerigo,
    adicionalInsalubridade,
    totalAdicionais,
  }
}

/**
 * Calcula reenquadramento salarial
 */
export function calcularReenquadramento(params: ReenquadramentoParams) {
  const { salarioDevidoMes, salarioPagoMes } = params

  // Verificar se os arrays têm o mesmo tamanho
  if (salarioDevidoMes.length !== salarioPagoMes.length) {
    throw new Error("Os arrays de salários devidos e pagos devem ter o mesmo tamanho")
  }

  // Calcular diferença por mês
  const diferencaMes = salarioDevidoMes.map((devido, index) => devido - salarioPagoMes[index])

  // Calcular débito total
  const debitoTotal = diferencaMes.reduce((sum, diferenca) => sum + diferenca, 0)

  return {
    salarioDevidoMes,
    salarioPagoMes,
    diferencaMes,
    debitoTotal,
  }
}

/**
 * Calcula dano existencial ou moral trabalhista
 */
export function calcularDanoMoralTrabalhista(params: DanoMoralTrabalhistaParams) {
  const { valorSentenciado, indiceIPCA, meses, taxaSelic } = params

  // Correção monetária
  const valorCorrigido = valorSentenciado * Math.pow(1 + indiceIPCA, meses)

  // Juros
  const juros = valorCorrigido * taxaSelic * meses

  // Valor final
  const valorFinal = valorCorrigido + juros

  return {
    valorSentenciado,
    indiceIPCA,
    meses,
    taxaSelic,
    valorCorrigido,
    juros,
    valorFinal,
  }
}
