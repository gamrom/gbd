import useSWR from 'swr'
import { fetcher } from "../api";

export const useGetCurrentUser = () => {
  const currentUser = useSWR('/me',
    (url) => fetcher({
      url: url,
      method: 'GET',
    }),
  )

  return currentUser
}