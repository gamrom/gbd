import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import dayjs, { Dayjs } from 'dayjs';
import { getEvents } from './api';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Badge } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import useSWR from 'swr'
import { fetcher } from "./api";
import { LoadingComp } from './loadingComp';
import { useGetCurrentUser } from './hooks/useGetCurrentUser';

type EventProps = {
  id: number,
  start_time: any,
  end_time: any,
  title: string
  location: string,
  owner_name: string,
  max_members_count: number,
  current_members_count: number,
}

export const CalendarComponent = () => {
  const [toggleFilter, setToggleFilter] = useState<string | null>('monthAll');

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string | null,
  ) => {
    setToggleFilter(newToggle)
  };

  const [pickDate, setPickDate] = useState<Dayjs | any>(dayjs());

  const { data: currentUser } = useGetCurrentUser();

  const { data: events, isLoading: eventsIsLoading } = useSWR("/events", (url) => fetcher({
    url: url,
    method: 'GET',
    data: {
      year: pickDate.year(),
      month: pickDate.month() + 1,
    }
  }));

  const [eventsDay, setEventsDay] = useState<Array<number>>([]);
  useEffect(() => {
    //모든 이벤트의 시작날짜와 끝날짜 사이의 모든 날짜를 구한다.
    const allDays: number[] = [];
    events && events.data.forEach((event: EventProps) => {
      const startDay = dayjs(event.start_time).date();
      const endDay = dayjs(event.end_time).date();
      for (let i = startDay; i <= endDay; i++) {
        allDays.push(i);
      }
    })
    //중복된 날짜를 제거한다.
    const uniqueDays = Array.from(new Set(allDays));
    //중복된 날짜를 제거한 날짜들을 eventsDay에 넣는다.

    uniqueDays && setEventsDay(uniqueDays);
  }, [events])

  function ServerDay(props: PickersDayProps<Dayjs> & { eventsDay?: number[] }) {
    const { eventsDay = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected = dayjs().daysInMonth() && eventsDay.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🔴' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  return !eventsIsLoading ? (
    <div>
      {
        currentUser && currentUser.data.role !== "guest" && (
          <>
            <ToggleButtonGroup
              value={toggleFilter}
              exclusive
              onChange={handleFilter}
              size="small"
              className="w-full mt-4"
            >
              <ToggleButton className="w-full text-xs" color="secondary" value="monthAll" aria-label="left aligned">
                이번달 모든 번개
              </ToggleButton>
              <ToggleButton className="w-full text-xs" color="secondary" value="alreadyJoin" aria-label="centered">
                참가중인 번개
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="flex items-center justify-center">
              <Link href={`/events/create?pickDate=${pickDate}`} >
                <Button
                  variant="contained"
                  className="mt-4 mx-auto text-center"
                  color="success"
                  type="button"
                >번개 생성</Button>
              </Link>
            </div>
          </>
        )
      }

      <DateCalendar
        value={pickDate}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            eventsDay,
          } as any,
        }}
        onChange={(newValue) => setPickDate(newValue)} renderLoading={() => <DayCalendarSkeleton />} />

      <div className="flex flex-col space-y-2">
        {events && events.data.map((event: EventProps, index: number) => {
          return (
            <Link key={index} href={`/events/${event.id}`} className="no-underline text-black">
              <div className={`hover:cursor-pointer hover:font-bold hover:opacity-100 opacity-90 drop-shadow py-2 px-4 flex flex-col justify-between mt-2 text-sm rounded-[5px] ${event.current_members_count >= event.max_members_count ? "bg-[#e57373]" : "bg-[#81c784]"}`}>
                <div className="flex justify-between w-full">
                  <div className="flex space-x-4 w-full">
                    <div>{dayjs(event.start_time).format('YY/MM/DD')}</div>
                    <div>{event.current_members_count}/{event.max_members_count}</div>
                  </div>
                  <div className="shrink-0">{event.owner_name}</div>
                </div>
                <div className="truncate">{event.title}</div>
              </div>
            </Link>
          )
        }
        )}
      </div>
    </div>
  ) : (
    <LoadingComp />
  )
}