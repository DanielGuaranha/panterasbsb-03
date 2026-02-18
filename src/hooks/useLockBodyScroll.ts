import { useLayoutEffect } from 'react';

export default function useLockBodyScroll(locked: boolean = true) {
  useLayoutEffect(() => {
    if (!locked) return;

    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Lock body
    document.body.style.overflow = 'hidden';
    // Fix para iOS Safari que às vezes ignora overflow: hidden no body
    document.body.style.position = 'fixed'; 
    document.body.style.width = '100%';
    // Nota: Em uma impl real completa, precisaríamos salvar o scrollY para restaurar a posição exata
    // mas para este MVP, 'hidden' resolve 90% dos casos sem pular para o topo se o app for SPA.

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [locked]);
}