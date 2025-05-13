import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { ptBR } from "@clerk/localizations"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { neobrutalism } from '@clerk/themes'
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata = {
  title: "LeiFácil - Inteligência Jurídica para Todos",
  description: "Acesso claro, rápido e confiável à legislação brasileira.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
     <ClerkProvider localization={ptBR}
     appearance={{
      baseTheme: neobrutalism}}
    >
      
      <html lang="pt-BR" suppressHydrationWarning>
     
        <body className={`${inter.variable} ${playfair.variable} font-sans`}>
          
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
       
        </body> 
      
      </html>
      
      </ClerkProvider> 
  )
}
