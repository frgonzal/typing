import { SetStateAction, use, useEffect, useState } from 'react';
import { API_WORDS } from '@/constants/game';
import { Dispatch } from 'react';


interface FetchState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}


const useFetch = <T,>(reloadTrigger:number): FetchState<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [accData, setAccData] = useState<T | undefined>(undefined);
  const [refreshData, setRefreshData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (setter: Dispatch<SetStateAction<T | undefined>>) => {
    try {
      const response = await fetch(API_WORDS);
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
    if (data === undefined) {
      fetchData(setData);
    } else {
      setData(refreshData)
    }
    fetchData(setRefreshData);
  }, [reloadTrigger]);

  return { data, error, isLoading };
}


export default useFetch;