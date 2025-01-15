import { useState, useEffect, use } from 'react';

interface FetchState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}


function useFetch<T>(url: string, reloadTrigger: number = 0): FetchState<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [refreshData, setRefreshData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(data, refreshData);

  useEffect(() => {
    setError(undefined);
    setRefreshData(undefined);

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async (setData: (data: T | undefined) => void) => {
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

    if (data === undefined) {
      fetchData(setData);
    } else {
      setData(refreshData)
    }
    fetchData(setRefreshData);

    return () => {
      controller.abort();
    };
  }, [url, reloadTrigger]);

  return { data, error, isLoading };
}


export default useFetch;