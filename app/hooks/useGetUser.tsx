import useSWR from 'swr'
import { fetcher } from "../api";

export const useGetUser = () => {
  const currentUser = useSWR('/me',
    (url) => fetcher({
      url: url,
      method: 'GET',
    }),
  )

  return currentUser
}