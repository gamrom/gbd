'use client'

import { Notices } from "./notices"
import { CalendarComponent } from "./calendarComponent";

export default function Events() {
  return (
    <div className="max-w-[650px] mx-auto px-4 min-h-screen">
      <Notices />
      <CalendarComponent />
    </div>
  )
}