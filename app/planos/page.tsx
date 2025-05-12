import { Navbar } from "@/components/navbar"
import { PricingCard, type PricingPlan } from "@/components/pricing-card"

const plans: PricingPlan[] = [
  {
    name: "Básico",
    price: "49,90",
    description: "Para uso pessoal e dúvidas jurídicas ocasionais",
    features: ["30 consultas por mês", "Acesso à legislação básica", "Respostas em até 24h", "Suporte por email"],
    buttonText: "Começar Grátis",
    buttonVariant: "outline",
  },
  {
    name: "Profissional",
    price: "99,90",
    description: "Para advogados e profissionais do direito",
    features: [
      "Consultas ilimitadas",
      "Acesso à legislação completa",
      "Respostas em tempo real",
      "Suporte prioritário",
      "Exportação de relatórios",
    ],
    popular: true,
    buttonText: "Escolher Plano",
  },
  {
    name: "Empresarial",
    price: "199,90",
    description: "Para escritórios e departamentos jurídicos",
    features: [
      "Consultas ilimitadas",
      "Acesso à legislação completa",
      "Respostas em tempo real",
      "Suporte VIP 24/7",
      "Exportação de relatórios",
      "Múltiplos usuários",
      "API de integração",
    ],
    buttonText: "Contato Comercial",
    buttonVariant: "outline",
  },
]

export default function PlanosPage() {
  return (
    <>
      <Navbar />
      <div className="container py-16 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Escolha o plano ideal para você
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Temos opções para todos os perfis, desde estudantes até grandes escritórios
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </>
  )
}
