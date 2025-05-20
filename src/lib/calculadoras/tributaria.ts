// Interfaces para os parâmetros dos cálculos
export interface TributosAtrasoParams {
  valor: number
  selicDiaria: number
  diasAtraso: number
  percentualMulta: number // 0.2 para 20%
}

export interface ParcelamentoParams {
  debito: number
  taxaJuros: number // Taxa mensal (ex: 0.01 para 1%)
  numeroParcelas: number
}

export interface CompensacaoCreditosParams {
  debitoBruto: number
  creditosAptos: number[]
}

export interface ImpostosIndevidosParams {
  impostoPago: number
  indiceIPCA: number
  meses: number
  taxaSelic: number
}

// Funções de cálculo para a área tributária

/**
 * Calcula tributos em atraso
 */
export function calcularTributosAtraso(params: TributosAtrasoParams) {
  const { valor, selicDiaria, diasAtraso, percentualMulta } = params

  // Calcular juros
  const juros = valor * (Math.pow(1 + selicDiaria, diasAtraso) - 1)

  // Calcular multa
  const multa = valor * percentualMulta

  // Calcular total
  const total = valor + juros + multa

  return {
    valor,
    selicDiaria,
    diasAtraso,
    percentualMulta,
    juros,
    multa,
    total,
  }
}

/**
 * Calcula parcelamento (fórmula PRICE)
 */
export function calcularParcelamento(params: ParcelamentoParams) {
  const { debito, taxaJuros, numeroParcelas } = params

  // Calcular valor da parcela (fórmula PRICE)
  const parcela =
    (debito * (taxaJuros * Math.pow(1 + taxaJuros, numeroParcelas))) / (Math.pow(1 + taxaJuros, numeroParcelas) - 1)

  // Calcular total a pagar
  const totalPagar = parcela * numeroParcelas

  // Calcular juros totais
  const jurosTotais = totalPagar - debito

  return {
    debito,
    taxaJuros,
    numeroParcelas,
    parcela,
    totalPagar,
    jurosTotais,
  }
}

/**
 * Calcula compensação de créditos
 */
export function calcularCompensacaoCreditos(params: CompensacaoCreditosParams) {
  const { debitoBruto, creditosAptos } = params

  // Calcular total de créditos
  const totalCreditos = creditosAptos.reduce((sum, credito) => sum + credito, 0)

  // Calcular débito líquido
  const debitoLiquido = Math.max(debitoBruto - totalCreditos, 0)

  // Calcular créditos remanescentes
  const creditosRemanescentes = Math.max(totalCreditos - debitoBruto, 0)

  return {
    debitoBruto,
    creditosAptos,
    totalCreditos,
    debitoLiquido,
    creditosRemanescentes,
  }
}

/**
 * Calcula impostos indevidos (restituição)
 */
export function calcularImpostosIndevidos(params: ImpostosIndevidosParams) {
  const { impostoPago, indiceIPCA, meses, taxaSelic } = params

  // Calcular correção monetária
  const valorCorrigido = impostoPago * Math.pow(1 + indiceIPCA, meses)

  // Calcular juros
  const juros = valorCorrigido * taxaSelic * meses

  // Calcular restituição
  const restituicao = valorCorrigido + juros

  return {
    impostoPago,
    indiceIPCA,
    meses,
    taxaSelic,
    valorCorrigido,
    juros,
    restituicao,
  }
}
