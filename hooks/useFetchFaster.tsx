import { SetStateAction, use, useEffect, useState } from 'react';
import { API_WORDS } from '@/constants/game';
import { Dispatch } from 'react';

/**
 * Represents the state of the fetch operation.
 *
 * @template T - The type of data expected from the API response.
 */
interface FetchState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

/**
 * Custom hook to fetch data from an API and manage loading and error states.
 *
 * @template T - The type of data expected from the API response.
 * @param {number} reloadTrigger - A number that triggers the data fetch when changed.
 * @returns {FetchState<T>} An object containing the fetched data, any error encountered, and the loading state.
 */
const useFetch = <T,>(reloadTrigger:number): FetchState<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [refreshData, setRefreshData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (setter: Dispatch<SetStateAction<T | undefined>>, signal: AbortSignal | undefined = undefined) => {
    try {
      const response = await fetch(API_WORDS, { signal });
      if (!response.ok)
        throw new Error(`Error: ${response.statusText}`);
      const data: T = await response.json();
      setter(data);
    } catch (error) {
      if ((error as Error).name !== 'AbortError')
        setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (data === undefined) {
      fetchData(setData, signal);
    } else {
      setData(refreshData)
    }
    fetchData(setRefreshData, signal);

    return () => controller.abort();
  }, [reloadTrigger]);

  return { data, error, isLoading };
}


export default useFetch;