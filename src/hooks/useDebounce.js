import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  // Estado para guardar o valor com atraso
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Atualiza o debouncedValue depois do tempo (delay) especificado
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Se o valor mudar antes do tempo acabar (ou seja, o usuário continua digitando),
    // o clearTimeout cancela o timer anterior e começa a contar de novo.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}