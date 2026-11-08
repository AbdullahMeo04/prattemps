import { useEffect, useState } from 'react';
import { missatgeError } from '../utils/missatgeError';

export interface UseApiResult<T> {
  data: T | null;
  dades: T | null;
  loading: boolean;
  carregant: boolean;
  error: string;
  statusCode: number | null;
}

export function useApi<T>(url: string | null): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    if (url === null) {
      setData(null);
      setLoading(false);
      setError('');
      setStatusCode(null);
      return;
    }

    let ignorar = false;
    const controller = new AbortController();

    async function carregar(adreca: string) {
      setLoading(true);
      setError('');
      setStatusCode(null);
      setData(null);

      try {
        const resposta = await fetch(adreca, { signal: controller.signal });

        if (!resposta.ok) {
          if (!ignorar) {
            setStatusCode(resposta.status);
            setError(missatgeError(resposta.status));
          }
          return;
        }

        const json: T = await resposta.json();
        if (!ignorar) {
          setData(json);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          // No mostrem AbortError com un error
          return;
        }
        if (!ignorar) {
          setError(err instanceof Error ? err.message : 'Error desconegut');
        }
      } finally {
        if (!ignorar) {
          setLoading(false);
        }
      }
    }

    carregar(url);

    return () => {
      ignorar = true;
      controller.abort();
    };
  }, [url]);

  return {
    data,
    dades: data,
    loading,
    carregant: loading,
    error,
    statusCode,
  };
}
