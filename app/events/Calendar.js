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
        const eventCount = events.filter((event) => {
          const startTime = dayjs(event.start_time);
          const endTime = dayjs(event.end_time);
          return (
            dayjs(date).isSameOrAfter(startTime, "day") &&
            dayjs(date).isSameOrBefore(endTime, "day")
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
