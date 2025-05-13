import { Scale, BookOpen, Shield, Clock, Sparkles, Users } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Acesso à Legislação",
    description: "Consulte toda a legislação brasileira de forma rápida e simplificada.",
  },
  {
    icon: Scale,
    title: "Análise Jurídica",
    description: "Obtenha análises precisas sobre questões jurídicas complexas.",
  },
  {
    icon: Shield,
    title: "Segurança e Privacidade",
    description: "Seus dados e consultas são protegidos com os mais altos padrões de segurança.",
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Encontre respostas em segundos, não em horas de pesquisa.",
  },
  {
    icon: Sparkles,
    title: "IA Especializada",
    description: "Nossa inteligência artificial é treinada especificamente no direito brasileiro.",
  },
  {
    icon: Users,
    title: "Para Todos",
    description: "Seja advogado, estudante ou cidadão, nossa plataforma é para você.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Por que escolher a <span className="gradient-text">LeiFácil</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nossa plataforma oferece recursos exclusivos para facilitar seu acesso à justiça
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
