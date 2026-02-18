'use client';

import { useEffect, useState } from 'react';

export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string>('');

  useEffect(() => {
    // Tenta recuperar do localStorage
    let storedId = localStorage.getItem('panteras_visitor_id');
    
    // Se não existir, gera um novo UUID v4 fake (suficiente para anonimato)
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem('panteras_visitor_id', storedId);
    }
    
    setVisitorId(storedId);
  }, []);

  return visitorId;
}
