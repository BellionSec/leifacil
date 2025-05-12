"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useAuth } from "@clerk/nextjs"
import { Scale, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const { isSignedIn } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Planos", href: "/planos" },
    ...(isSignedIn
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Resumo de Documentos", href: "/resumo-documentos" },
          { name: "Explicador Jurídico", href: "/explicador-juridico" },
          { name: "Calculadora Jurídica", href: "/calculadora-juridica" },
          { name: "Checklist Jurídico", href: "/checklist-juridico" },
          { name: "Perfil", href: "/perfil" },
        ]
      : []),
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-serif">LeiFácil</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Cadastrar</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          {isSignedIn && <UserButton afterSignOutUrl="/" />}
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1.5 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {!isSignedIn && (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                    Cadastrar
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
