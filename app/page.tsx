'use client'

import { Notices } from "./notices"
import { useState, useEffect, useContext } from "react";
import { CalendarComponent } from "./calendarComponent";
import useSWR from 'swr'
import { fetcher } from './api';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])



  return (
    <div>
      <Notices />
      {isClient &&
        <CalendarComponent />
      }
    </div>
  )
}