import { useState, useEffect } from 'react';

interface FetchState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}


function useFetch<T>(url: string, reloadTrigger: number = 0): FetchState<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    setData(undefined);

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: T = await response.json();
        setData(data);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setError(error as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, reloadTrigger]);

  return { data, error, isLoading };
}


export default useFetch;