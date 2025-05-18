import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { Badge, Avatar } from "@nextui-org/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
import "dayjs/locale/ko";
dayjs.locale("ko");

export const EventCalendar = ({ filter, events }) => {
  const router = useRouter();
  return (
    <Calendar
      tileContent={({ date, view }) => {
        //check how many events in this date
        if (!events || events.length === 0) return null;
        
        // Convert the Calendar date object to dayjs with consistent formatting
        const calendarDate = dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate())).startOf('day');
        
        const eventCount = events.filter((event) => {
          // Ensure consistent date parsing by explicitly formatting dates
          const startTime = event.start_time ? dayjs(event.start_time.replace(/-/g, "/")).startOf('day') : null;
          const endTime = event.end_time ? dayjs(event.end_time.replace(/-/g, "/")).startOf('day') : null;
          
          // Skip invalid dates
          if (!startTime || !endTime) return false;
          
          // Check if the event's date range contains the calendar date
          // (i.e., the event is happening on this calendar date)
          return (
            startTime.isSameOrBefore(calendarDate, "day") &&
            endTime.isSameOrAfter(calendarDate, "day")
          );
        }).length;
        if (eventCount === 0) return null;
        return (
          <Badge
            content={eventCount}
            color="default"
            size="sm"
            showOutline={false}
          />
        );
      }}
      calendarType="gregory"
      value={filter.toggle === "pickDay" ? filter.pickDate : null}
      onActiveStartDateChange={({ activeStartDate }) => {
        router.push(
          `/events?pickDate=${dayjs(activeStartDate).format("YYYY-MM-DD")}&toggle=monthAll`,
          { scroll: false },
        );
      }}
      onClickDay={(date) => {
        router.push(
          `/events?pickDate=${dayjs(date).format("YYYY-MM-DD")}&toggle=pickDay`,
          { scroll: false },
        );
      }}
    />
  );
};
