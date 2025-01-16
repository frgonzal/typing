import { useState, useEffect } from 'react';
import { API_WORDS } from '@/constants/game';

interface FetchState<T> {
  data?: T[];
  error?: Error;
  isLoading: boolean;
  loadMoreData: () => void;
  reloadData: () => void;
}

const TOTAL_WORDS = 20;

function useFetch<T>(): FetchState<T> {
  const [data, setData] = useState<T[]>([]);
  const [refreshData, setRefreshData] = useState<T[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (setData: (data: T[]) => void) => {
    try {
      const response = await fetch(API_WORDS);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: T[] = await response.json();
      setData(data);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreData = () => {
    setData(data => data.concat(refreshData));
    fetchData(setRefreshData);
    console.log("loadMoreData");
  };

  const reloadData= () => {
    setRefreshData([]);
    if (data.length === 0) {
      fetchData(setData);
    } else {
      setData(refreshData)
    }
    fetchData(setRefreshData);
  };

  return { data, error, isLoading, loadMoreData, reloadData };
}


export default useFetch;