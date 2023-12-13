'use client'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'

export const useGetUser = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
  }, [])

  return { user }
}