// Interfaces para os parâmetros dos cálculos
export interface TempoContribuicaoParams {
  mesesComuns: number
  mesesEspeciais: number
  fatorConversao: number // 1.2 ou 1.4
}

export interface SimulacaoAposentadoriaParams {
  idade: number
  tempoContribuicao: number
  pontos: number // Soma de idade e tempo de contribuição
  sexo: "M" | "F"
  dataAposentadoria: Date
}

export interface RMIParams {
  contribuicoes: number[] // Contribuições desde julho/1994
  anosExtras: number // Anos além do mínimo exigido
}

export interface AtrasadosBeneficiosParams {
  valoresParcelas: number[]
  indiceINPC: Record<string, number> // Índices mensais do INPC
  dataInicial: Date
}

export interface ConversaoTempoEspecialParams {
  mesesEspecial: number
  fator: number // 1.2 ou 1.4
}

// Funções de cálculo para a área previdenciária

/**
 * Calcula o tempo de contribuição
 */
export function calcularTempoContribuicao(params: TempoContribuicaoParams) {
  const { mesesComuns, mesesEspeciais, fatorConversao } = params

  // Converter tempo especial
  const mesesEspeciaisConvertidos = mesesEspeciais * fatorConversao

  // Calcular tempo total
  const tempoTotal = mesesComuns + mesesEspeciaisConvertidos

  return {
    mesesComuns,
    mesesEspeciais,
    fatorConversao,
    mesesEspeciaisConvertidos,
    tempoTotal,
  }
}

/**
 * Simula aposentadoria conforme regras atuais
 */
export function simularAposentadoria(params: SimulacaoAposentadoriaParams) {
  const { idade, tempoContribuicao, pontos, sexo, dataAposentadoria } = params

  // Verificar se atende aos requisitos mínimos
  const idadeMinima = sexo === "M" ? 65 : 62
  const tempoContribuicaoMinimo = sexo === "M" ? 20 * 12 : 15 * 12 // Em meses
  const pontosMinimos = sexo === "M" ? 98 : 88

  // Verificar regra de transição por pontos
  const atendeRegra1 = pontos >= pontosMinimos && tempoContribuicao >= tempoContribuicaoMinimo

  // Verificar regra de transição por idade mínima progressiva
  const ano = dataAposentadoria.getFullYear()
  let idadeMinimaProgressiva = sexo === "M" ? 61 : 56
  if (ano >= 2020) {
    idadeMinimaProgressiva += Math.min(ano - 2019, 4) * 0.5
  }
  const atendeRegra2 = idade >= idadeMinimaProgressiva && tempoContribuicao >= tempoContribuicaoMinimo

  // Verificar regra de transição por pedágio de 50%
  const tempoFaltante = (sexo === "M" ? 35 * 12 : 30 * 12) - tempoContribuicao
  const pedagio = tempoFaltante * 0.5
  const atendeRegra3 = tempoFaltante <= 0 || tempoContribuicao + pedagio >= (sexo === "M" ? 35 * 12 : 30 * 12)

  // Verificar regra de transição por pedágio de 100%
  const idadePedagio100 = sexo === "M" ? 60 : 57
  const atendeRegra4 = idade >= idadePedagio100 && tempoFaltante <= 0

  // Verificar regra permanente por idade
  const atendeRegraPermanente = idade >= idadeMinima && tempoContribuicao >= tempoContribuicaoMinimo

  return {
    idade,
    tempoContribuicao,
    pontos,
    sexo,
    dataAposentadoria,
    idadeMinima,
    tempoContribuicaoMinimo,
    pontosMinimos,
    atendeRegra1,
    atendeRegra2,
    atendeRegra3,
    atendeRegra4,
    atendeRegraPermanente,
    podeAposentar: atendeRegra1 || atendeRegra2 || atendeRegra3 || atendeRegra4 || atendeRegraPermanente,
  }
}

/**
 * Calcula a Renda Mensal Inicial (RMI)
 */
export function calcularRMI(params: RMIParams) {
  const { contribuicoes, anosExtras } = params

  // Calcular salário de benefício (média das contribuições)
  const salarioBeneficio = contribuicoes.reduce((sum, contrib) => sum + contrib, 0) / contribuicoes.length

  // Calcular coeficiente (60% + 2% por ano extra)
  const coeficiente = Math.min(0.6 + 0.02 * anosExtras, 1.0) // Limitado a 100%

  // Calcular RMI
  const rmi = salarioBeneficio * coeficiente

  return {
    contribuicoes,
    anosExtras,
    salarioBeneficio,
    coeficiente,
    rmi,
  }
}

/**
 * Calcula atrasados em benefícios
 */
export function calcularAtrasadosBeneficios(params: AtrasadosBeneficiosParams) {
  const { valoresParcelas, indiceINPC, dataInicial } = params

  const parcelasCorrigidas = valoresParcelas.map((valor, index) => {
    // Calcular data da parcela
    const dataParcela = new Date(dataInicial)
    dataParcela.setMonth(dataInicial.getMonth() + index)

    // Calcular meses de atraso
    const mesesAtraso = valoresParcelas.length - index - 1

    // Calcular correção
    let fatorCorrecao = 1
    for (let i = 0; i < mesesAtraso; i++) {
      const dataAtual = new Date(dataParcela)
      dataAtual.setMonth(dataParcela.getMonth() + i)
      const chave = format(dataAtual, "yyyy-MM")

      if (indiceINPC[chave]) {
        fatorCorrecao *= 1 + indiceINPC[chave]
      }
    }

    // Valor corrigido
    const valorCorrigido = valor * fatorCorrecao

    return {
      parcela: index + 1,
      valor,
      dataParcela,
      mesesAtraso,
      fatorCorrecao,
      valorCorrigido,
    }
  })

  // Calcular total
  const totalOriginal = valoresParcelas.reduce((sum, valor) => sum + valor, 0)
  const totalCorrigido = parcelasCorrigidas.reduce((sum, parcela) => sum + parcela.valorCorrigido, 0)

  return {
    parcelasCorrigidas,
    totalOriginal,
    totalCorrigido,
  }
}

/**
 * Calcula conversão de tempo especial
 */
export function calcularConversaoTempoEspecial(params: ConversaoTempoEspecialParams) {
  const { mesesEspecial, fator } = params

  // Converter tempo especial para comum
  const tempoConvertido = mesesEspecial * fator

  return {
    mesesEspecial,
    fator,
    tempoConvertido,
  }
}

// Função auxiliar para formatar data
function format(date: Date, formatStr: string): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")

  return `${year}-${month}`
}
