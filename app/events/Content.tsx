"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Button, Card, CardBody, Link } from "@nextui-org/react";
import { EventProps } from "@/types";
import { EventButtonGroups } from "./EventButtonGroups";
import { EventCalendar } from "./Calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { getEvents } from "../api";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/ko";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
dayjs.locale("ko");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const Content = ({ eventData }: { eventData: EventProps[] }) => {
  const { data: currentUser } = useGetCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<EventProps[]>(eventData);
  const [eventCards, setEventCards] = useState<EventProps[]>(eventData);

  const [filter, setFilter] = useState({
    pickDate: dayjs().format("YYYY-MM-DD"), //"YYYY-MM-DD" string
    toggle: "monthAll", //monthAll, canJoin, alreadyJoin, pickDay
  });

  useEffect(() => {
    if (filter.toggle === "pickDay") {
      const filteredData = events.filter((event) => {
        const startTime = dayjs(event.start_time);
        const endTime = dayjs(event.end_time);
        return (
          dayjs(filter.pickDate).isSameOrAfter(startTime, "day") &&
          dayjs(filter.pickDate).isSameOrBefore(endTime, "day")
        );
      });

      setEventCards(filteredData);
    } else {
      if (filter.toggle === "monthAll") {
        getEvents({
          year: dayjs(filter.pickDate).format("YYYY"),
          month: dayjs(filter.pickDate).format("MM"),
        }).then((res) => {
          setEvents(res.data);
          setEventCards(res.data);
        });
      }

      if (filter.toggle === "canJoin") {
        getEvents({
          year: dayjs(filter.pickDate).format("YYYY"),
          month: dayjs(filter.pickDate).format("MM"),
        }).then((res) => {
          //event 중에서 오늘을 포함한 앞으로의 모든 날짜를 필터

          const filter1 = res.data.filter((event: EventProps) => {
            const startTime = dayjs(event.start_time.replace(/-/g, "/"));
            return startTime.isAfter(dayjs().startOf("day"));
          });

          //참가 가능한 이벤트들을 필터
          const filter2 = filter1.filter((event: EventProps) => {
            return event.current_members_count !== event.max_members_count;
          });

          setEventCards(filter2);
        });
      }
    }
  }, [filter]);
  //
  useEffect(() => {
    setFilter({
      pickDate: searchParams.get("pickDate") || dayjs().format("YYYY-MM-DD"),
      toggle: searchParams.get("toggle") || "monthAll",
    });
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 px-4 lg:grid-cols-2 max-w-[1024px] mx-auto mt-[30px] gap-8">
      <div className="flex flex-col">
        <EventCalendar filter={filter} events={events} />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          {currentUser && (
            <Link
              href={
                filter.toggle === "pickDay"
                  ? `/events/create?pickDate=${filter.pickDate}`
                  : "/events/create"
              }
            >
              <Button
                size="lg"
                color="secondary"
                className="text-white"
                variant="shadow"
              >
                번개 생성
              </Button>
            </Link>
          )}
          <div className="flex gap-2 px-4 py-2 h-fit w-fit bg-default">
            <Button
              radius="none"
              className={`${filter.toggle === "monthAll" ? "bg-white" : ""}`}
              onClick={() =>
                router.push(
                  `/events/?pickDate=${filter.pickDate}&toggle=monthAll`
                )
              }
            >
              이번 달 모든 번개
            </Button>
            {currentUser && (
              <Button
                radius="none"
                className={`${filter.toggle === "canJoin" ? "bg-white" : ""}`}
                onClick={() =>
                  router.push(
                    `/events/?pickDate=${filter.pickDate}&toggle=canJoin`
                  )
                }
              >
                참가 가능한 모든 번개
              </Button>
            )}
          </div>
        </div>

        {eventCards.length !== 0 ? (
          <EventButtonGroups events={eventCards} />
        ) : (
          <Card>
            <CardBody>번개가 아직 없습니다.</CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};
