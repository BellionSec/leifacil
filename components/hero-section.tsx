import Link from "next/link"
import { Scale, Shield, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in">
                Inteligência Jurídica para <span className="gradient-text">Todos</span>
              </h1>
              <p
                className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                Acesso claro, rápido e confiável à legislação brasileira. Tire suas dúvidas jurídicas com a ajuda da
                nossa IA especializada.
              </p>
            </div>
            <div
              className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Comece Agora <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/planos">Ver Planos</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-background" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Mais de <span className="font-medium text-foreground">1,000+</span> profissionais confiam em nós
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[450px] aspect-square animate-slide-up">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scale className="h-32 w-32 text-primary/40" />
                </div>
              </div>
              <div
                className="absolute -top-6 -left-6 p-4 bg-background rounded-xl shadow-lg border animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Acesso a toda legislação</span>
                </div>
              </div>
              <div
                className="absolute -bottom-6 -right-6 p-4 bg-background rounded-xl shadow-lg border animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Segurança e privacidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
