import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateCalendar, DateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import dayjs, { Dayjs } from 'dayjs';
import { getEvents } from './api';


function createData(
  date: string,
  currentMember: number,
  maxMember: number,
  partyCreator: string,
  title: string,
) {
  return { date, currentMember, maxMember, partyCreator, title };
}

export const CalendarComponent = () => {
  const [toggleFilter, setToggleFilter] = useState<string | null>('monthAll');

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string | null,
  ) => {
    setToggleFilter(newToggle)
  };



  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState<boolean>(false);
  const [pickDate, setPickDate] = useState<Dayjs | any>(dayjs());

  const [capacity, setCapacity] = useState<number | undefined>(1);

  const [events, setEvents] = useState<Array<{
    id: number,
    start_time: any,
    end_time: any,
    title: string
    location: string,
    owner_name: string,
    max_members_count: number,
    current_members_count: number,
  }>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    getEvents({
      year: pickDate.year(),
      month: pickDate.month() + 1,
    }).then((res) => {
      setEvents(res.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [pickDate.year(), pickDate.month()])

  return (
    <div>
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


      <DateCalendar value={pickDate} onChange={(newValue) => setPickDate(newValue)} />

      {!isLoading && <div className="flex flex-col space-y-2">
        {events && events.map((event: any, index: number) => {
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
      </div>}

    </div>
  )
}