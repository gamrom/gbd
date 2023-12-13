'use client'

import { Notices } from "./notices"
import { useState, useEffect } from "react";
import { CalendarComponent } from "./calendarComponent"

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