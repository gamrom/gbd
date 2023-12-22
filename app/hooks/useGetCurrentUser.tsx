import useSWR from 'swr'
import { fetcher } from "../api";
import { useState, useEffect } from 'react';
import { getMe } from '../api';

export const useGetCurrentUser = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    getMe().then((res) => {
      setData(res);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

  return { data, isLoading }
}