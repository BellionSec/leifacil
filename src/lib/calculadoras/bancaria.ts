// Interfaces para os parâmetros dos cálculos
export interface RevisaoContratosParams {
  valorContrato: number
  taxaPactuada: number // Taxa anual (ex: 0.12 para 12%)
  taxaEfetiva: number // Taxa anual efetiva (ex: 0.15 para 15%)
  prazoMeses: number
}

export interface AnatocismoParams {
  saldoDevedor: number
  taxaSimples: number // Taxa mensal (ex: 0.01 para 1%)
  meses: number
}

export interface ComparacaoPriceSACParams {
  valorFinanciamento: number
  taxaJuros: number // Taxa mensal (ex: 0.01 para 1%)
  prazoMeses: number
}

export interface JurosAbusivosParams {
  taxaContratada: number // Taxa anual (ex: 0.12 para 12%)
  taxaMedia: number // Taxa média de mercado (ex: 0.10 para 10%)
  valorPago: number
  valorFinanciado: number
  prazoMeses: number
}

// Funções de cálculo para a área bancária e financeira

/**
 * Calcula revisão de contratos bancários
 */
export function calcularRevisaoContratos(params: RevisaoContratosParams) {
  const { valorContrato, taxaPactuada, taxaEfetiva, prazoMeses } = params

  // Calcular valor com taxa pactuada
  const valorComTaxaPactuada = valorContrato * Math.pow(1 + taxaPactuada, prazoMeses / 12)

  // Calcular valor com taxa efetiva
  const valorComTaxaEfetiva = valorContrato * Math.pow(1 + taxaEfetiva, prazoMeses / 12)

  // Calcular diferença
  const diferenca = valorComTaxaEfetiva - valorComTaxaPactuada

  // Verificar se há abusividade
  const possuiAbusividade = taxaEfetiva > taxaPactuada * 1.5

  return {
    valorContrato,
    taxaPactuada,
    taxaEfetiva,
    prazoMeses,
    valorComTaxaPactuada,
    valorComTaxaEfetiva,
    diferenca,
    possuiAbusividade,
  }
}

/**
 * Calcula anatocismo (proibição de juros compostos)
 */
export function calcularAnatocismo(params: AnatocismoParams) {
  const { saldoDevedor, taxaSimples, meses } = params

  // Calcular juros simples
  const jurosSimples = saldoDevedor * taxaSimples * meses

  // Calcular valor com juros simples
  const valorComJurosSimples = saldoDevedor + jurosSimples

  // Calcular valor com juros compostos (para comparação)
  const valorComJurosCompostos = saldoDevedor * Math.pow(1 + taxaSimples, meses)

  // Calcular diferença
  const diferenca = valorComJurosCompostos - valorComJurosSimples

  return {
    saldoDevedor,
    taxaSimples,
    meses,
    jurosSimples,
    valorComJurosSimples,
    valorComJurosCompostos,
    diferenca,
  }
}

/**
 * Compara sistemas de amortização Price x SAC
 */
export function compararPriceSAC(params: ComparacaoPriceSACParams) {
  const { valorFinanciamento, taxaJuros, prazoMeses } = params

  // Calcular parcela Price
  const parcelaPrice =
    (valorFinanciamento * (taxaJuros * Math.pow(1 + taxaJuros, prazoMeses))) / (Math.pow(1 + taxaJuros, prazoMeses) - 1)
  const totalPrice = parcelaPrice * prazoMeses

  // Calcular amortização SAC
  const amortizacaoSAC = valorFinanciamento / prazoMeses

  // Calcular parcelas SAC
  const parcelasSAC = []
  let saldoDevedorSAC = valorFinanciamento
  let totalSAC = 0

  for (let i = 1; i <= prazoMeses; i++) {
    const jurosSAC = saldoDevedorSAC * taxaJuros
    const parcelaSAC = amortizacaoSAC + jurosSAC

    parcelasSAC.push({
      parcela: i,
      amortizacao: amortizacaoSAC,
      juros: jurosSAC,
      valor: parcelaSAC,
      saldoDevedor: saldoDevedorSAC - amortizacaoSAC,
    })

    totalSAC += parcelaSAC
    saldoDevedorSAC -= amortizacaoSAC
  }

  // Calcular diferença
  const diferenca = totalPrice - totalSAC

  return {
    valorFinanciamento,
    taxaJuros,
    prazoMeses,
    parcelaPrice,
    totalPrice,
    amortizacaoSAC,
    parcelaInicialSAC: parcelasSAC[0]?.valor || 0,
    parcelaFinalSAC: parcelasSAC[parcelasSAC.length - 1]?.valor || 0,
    totalSAC,
    diferenca,
    parcelasSAC,
  }
}

/**
 * Calcula juros abusivos
 */
export function calcularJurosAbusivos(params: JurosAbusivosParams) {
  const { taxaContratada, taxaMedia, valorPago, valorFinanciado, prazoMeses } = params

  // Verificar se a taxa é abusiva (mais de 50% acima da média)
  const taxaAbusiva = taxaContratada > taxaMedia * 1.5

  // Calcular valor devido com taxa média
  const valorDevidoTaxaMedia = valorFinanciado * Math.pow(1 + taxaMedia, prazoMeses / 12)

  // Calcular valor devido com taxa contratada
  const valorDevidoTaxaContratada = valorFinanciado * Math.pow(1 + taxaContratada, prazoMeses / 12)

  // Calcular diferença
  const diferenca = valorDevidoTaxaContratada - valorDevidoTaxaMedia

  // Calcular saldo a pagar ou a restituir
  const saldoRestituir = Math.max(valorPago - valorDevidoTaxaMedia, 0)
  const saldoPagar = Math.max(valorDevidoTaxaMedia - valorPago, 0)

  return {
    taxaContratada,
    taxaMedia,
    valorPago,
    valorFinanciado,
    prazoMeses,
    taxaAbusiva,
    valorDevidoTaxaMedia,
    valorDevidoTaxaContratada,
    diferenca,
    saldoRestituir,
    saldoPagar,
  }
}
