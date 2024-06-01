"use client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";
import { getCurrentMonthEvents, getApplyEvent, getEvents } from "../api";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Badge } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { LoadingComp } from "../loadingComp";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useSearchParams } from "next/navigation";

type EventProps = {
  id: number;
  start_time: any;
  end_time: any;
  title: string;
  location: string;
  owner_name: string;
  max_members_count: number;
  current_members_count: number;
};

export const CalendarComponent = ({
  eventData,
}: {
  eventData: EventProps[];
}) => {
  const [toggleFilter, setToggleFilter] = useState<string | null>("monthAll");
  const [pickDate, setPickDate] = useState<Dayjs | any>(null);
  const { data: currentUser } = useGetCurrentUser();
  const [eventsIsLoading, setEventsIsLoading] = useState<boolean>(true);

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string | null
  ) => {
    setToggleFilter(newToggle);
  };

  const [events, setEvents] = useState<EventProps[]>(eventData);

  const [callendarEvents, setCallendarEvents] = useState<Array<number>>([]);
  useEffect(() => {
    if (pickDate) {
      setToggleFilter("");
      getCurrentMonthEvents({
        year: String(dayjs(pickDate).year()),
        month: String(dayjs(pickDate).month() + 1),
      }).then((res) => {
        const allEvents = res.data;
        // 선택한 날짜가 시작날짜의 오전 0시 이상, 끝날짜의 오후 11시 59분 이하인 이벤트들을 뽑는다.
        const filteredData = allEvents.filter((event: EventProps) => {
          const startTime = dayjs(event.start_time.replace(/-/g, "/"));
          const endTime = dayjs(event.end_time.replace(/-/g, "/"));
          return (
            startTime.isBefore(pickDate.endOf("day")) &&
            endTime.isAfter(pickDate.startOf("day"))
          );
        });
        setEvents(filteredData);
      });
    }
  }, [pickDate]);

  useEffect(() => {
    if (toggleFilter === "monthAll") {
      setToggleFilter("monthAll");
      getCurrentMonthEvents({
        year: pickDate ? String(pickDate.year()) : String(dayjs().year()),
        month: pickDate
          ? String(pickDate.month() + 1)
          : String(dayjs().month() + 1),
      }).then((res) => {
        setEvents(res.data);
      });
    } else if (toggleFilter === "canJoin") {
      setToggleFilter("canJoin");
      getEvents().then((res) => {
        //res.data 중에서 시작시간이 오늘 이상인 이벤트들을 뽑는다.
        const filter1 = res.data.filter((event: EventProps) => {
          const startTime = dayjs(event.start_time.replace(/-/g, "/"));
          return startTime.isAfter(dayjs().startOf("day"));
        });

        const filter2 = filter1.filter((event: EventProps) => {
          return event.current_members_count !== event.max_members_count;
        });

        setEvents(filter2);
      });
    } else if (toggleFilter === "alreadyJoin") {
      setToggleFilter("alreadyJoin");
      getApplyEvent().then((res) => {
        setEvents(res.data);
      });
    }

    setEventsIsLoading(false);
  }, [toggleFilter, pickDate, callendarEvents]);

  useEffect(() => {
    //모든 이벤트의 시작날짜와 끝날짜 사이의 모든 날짜를 구한다.
    const allDays: number[] = [];
    getCurrentMonthEvents({
      year: pickDate ? String(pickDate.year()) : String(dayjs().year()),
      month: pickDate
        ? String(pickDate.month() + 1)
        : String(dayjs().month() + 1),
    }).then((res) => {
      const allEvents = res.data;
      allEvents &&
        allEvents.forEach((event: EventProps) => {
          const startDay = dayjs(event.start_time.replace(/-/g, "/")).date();
          const endDay = dayjs(event.end_time.replace(/-/g, "/")).date();
          for (let i = startDay; i <= endDay; i++) {
            allDays.push(i);
          }
        });
      //중복된 날짜를 제거한다.
      const uniqueDays = Array.from(new Set(allDays));
      setCallendarEvents(uniqueDays);
    });
  }, [pickDate]);

  const queryPickDate = useSearchParams().get("pickDate");
  useEffect(() => {
    if (queryPickDate) {
      setToggleFilter("");
      setPickDate(dayjs(queryPickDate).locale("ko"));
    } else {
      setPickDate(null);
    }
  }, [queryPickDate]);

  function ServerDay(
    props: PickersDayProps<Dayjs> & { callendarEvents?: number[] }
  ) {
    const { callendarEvents = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      callendarEvents.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "🔴" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  return !eventsIsLoading ? (
    <div>
      <ToggleButtonGroup
        value={toggleFilter}
        exclusive
        onChange={handleFilter}
        size="small"
        className="w-full mt-4"
      >
        <ToggleButton
          className="w-full text-xs"
          color="secondary"
          value="monthAll"
          aria-label="left aligned"
        >
          이번달 모든 번개
        </ToggleButton>
        {currentUser && currentUser.data.role !== "guest" && (
          <ToggleButton
            className="w-full text-xs"
            color="secondary"
            value="canJoin"
            aria-label="centered"
          >
            참가 가능한 번개
          </ToggleButton>
        )}

        {currentUser && currentUser.data.role !== "guest" && (
          <ToggleButton
            className="w-full text-xs"
            color="secondary"
            value="alreadyJoin"
            aria-label="right aligned"
          >
            참가 예정인 번개
          </ToggleButton>
        )}
      </ToggleButtonGroup>

      {currentUser && currentUser.data.role !== "guest" && (
        <div className="flex items-center justify-center">
          <Link
            className="w-full text-white no-underline text-center"
            href={`/events/create?pickDate=${pickDate}`}
          >
            <Button
              variant="gradient"
              className="mt-4 mx-auto text-center border-none"
              color="blue"
              type="button"
            >
              번개 생성
            </Button>
          </Link>
        </div>
      )}

      <DateCalendar
        value={pickDate}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            callendarEvents,
          } as any,
        }}
        onChange={(newValue) => {
          setToggleFilter("");
          setPickDate(newValue);
          //현재 주소뒤에 query paramter로 pickDate를 붙여준다.
          window.history.pushState(
            {},
            "",
            `?pickDate=${dayjs(newValue).format("YYYY-MM-DD")}`
          );
        }}
        onMonthChange={(newValue) => {
          setPickDate(newValue);
          setToggleFilter("monthAll");
        }}
        renderLoading={() => <DayCalendarSkeleton />}
      />

      <div className="flex flex-col space-y-2">
        {events &&
          events.map((event: EventProps, index: number) => {
            return (
              <Link
                key={index}
                href={`/events/${event.id}`}
                className="no-underline text-black"
              >
                <Button
                  color={`${event.current_members_count >= event.max_members_count ? "red" : "green"}`}
                  className={`w-full border-none hover:cursor-pointer hover:font-bold hover:opacity-100 opacity-90 drop-shadow py-2 px-4 flex flex-col justify-between mt-2 text-sm rounded-[5px] `}
                >
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-4 w-full">
                      <div>
                        {dayjs(event.start_time.replace(/-/g, "/")).format(
                          "YY/MM/DD"
                        )}
                      </div>
                      <div>
                        {event.current_members_count}/{event.max_members_count}
                      </div>
                      <div>{event.location}</div>
                    </div>
                    <div className="shrink-0">{event.owner_name}</div>
                  </div>
                  <div className="truncate">{event.title}</div>
                </Button>
              </Link>
            );
          })}
      </div>
    </div>
  ) : (
    <LoadingComp />
  );
};
