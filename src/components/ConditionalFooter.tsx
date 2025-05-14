"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ConditionalFooterProps {
  footer: ReactNode;
}

export default function ConditionalFooter({ footer }: ConditionalFooterProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/entrar') || pathname.includes('/cadastro');
  
  if (isAuthPage) {
    return null;
  }
  
  return footer;
}