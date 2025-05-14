# Lei Fácil

Uma plataforma jurídica moderna que oferece assistência legal inteligente, análise de documentos e ferramentas jurídicas.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Clerk](https://clerk.com/) - Autenticação e gerenciamento de usuários
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis

## 📁 Estrutura do Projeto

```
├── hooks/                      # Hooks personalizados
│   ├── use-mobile.tsx         # Hook para detectar dispositivos móveis
│   └── use-toast.ts           # Hook para notificações toast
│
├── public/                     # Arquivos estáticos
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
│
├── src/
│   ├── app/                   # Páginas da aplicação (App Router)
│   │   ├── globals.css       # Estilos globais da aplicação
│   │   ├── layout.tsx        # Layout principal da aplicação
│   │   ├── page.tsx          # Página inicial (Home)
│   │   ├── cadastro/         # Página de cadastro
│   │   ├── calculadora-juridica/
│   │   ├── checklist-juridico/
│   │   ├── dashboard/        # Área do usuário
│   │   ├── entrar/          # Página de login
│   │   ├── perfil/          # Perfil do usuário
│   │   ├── planos/          # Planos e preços
│   │   ├── politica-de-privacidade/
│   │   ├── resumo-documentos/
│   │   └── termos-de-uso/
|   |   
│   │
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes de UI base
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   └── ... (outros componentes UI)
│   │   │
│   │   ├── chat-input.tsx
│   │   ├── chat-loading.tsx
│   │   ├── chat-message.tsx
│   │   ├── ConditionalFooter.tsx
│   │   ├── cta-section.tsx
│   │   ├── features-section.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── navbar.tsx
│   │   ├── pricing-card.tsx
│   │   ├── testimonials-section.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── lib/                 # Utilitários e configurações
│   │   └── utils.ts
│   │
│   └── middleware.ts        # Middleware do Next.js
│
├── styles/
│   └── globals.css         # Estilos globais
│
├── components.json         # Configuração dos componentes
├── next.config.mjs        # Configuração do Next.js
├── package.json           # Dependências e scripts
├── postcss.config.mjs     # Configuração do PostCSS
├── tailwind.config.ts     # Configuração do Tailwind CSS
└── tsconfig.json         # Configuração do TypeScript
```

## 🎯 Principais Funcionalidades

- **Assistente Jurídico**: IA para responder questões legais
- **Resumo Inteligente**: Análise e resumo de documentos jurídicos
- **Calculadora Jurídica**: Cálculos de prazos e custas
- **Checklist Legal**: Listas de verificação para processos jurídicos
- **Multi-tema**: Suporte a tema claro/escuro
- **Responsivo**: Interface adaptável para todos os dispositivos
