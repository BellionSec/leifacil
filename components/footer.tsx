import Link from "next/link"
import { Scale, BookOpen, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">LeiFácil</h3>
            <p className="text-sm text-muted-foreground">
              Inteligência Jurídica para todos. Acesso claro, rápido e confiável à legislação brasileira.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Links Úteis</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/planos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Planos
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/perfil" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Perfil
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/termos-de-uso"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} LeiFácil. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Scale className="h-5 w-5" />
                <span className="sr-only">Justiça</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <BookOpen className="h-5 w-5" />
                <span className="sr-only">Conhecimento</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Shield className="h-5 w-5" />
                <span className="sr-only">Proteção</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
