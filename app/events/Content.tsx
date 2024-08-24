"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Button,
  Card,
  CardBody,
  Link,
  Chip,
  Divider,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { EventProps } from "@/types";
import { EventButtonGroups } from "./EventButtonGroups";
import { EventCalendar } from "./Calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { getApplyEvent, getEvents } from "../api";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/ko";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { LoadingComp } from "@/app/_components/LoadingComp";
dayjs.locale("ko");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const Content = ({ eventData }: { eventData: EventProps[] }) => {
  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<EventProps[]>(eventData);
  const [eventCards, setEventCards] = useState<EventProps[]>(eventData);

  const [selected, setSelected] = useState<string>("monthAll");

  const [filter, setFilter] = useState({
    pickDate: dayjs().format("YYYY-MM-DD"), //"YYYY-MM-DD" string
    toggle: "monthAll", //monthAll, canJoin, alreadyJoin, pickDay
  });

  useEffect(() => {
    if (selected === "monthAll") {
      router.push(`/events/?pickDate=${filter.pickDate}&toggle=monthAll`, {
        scroll: false,
      });
    }

    if (selected === "canJoin") {
      router.push(`/events/?pickDate=${filter.pickDate}&toggle=canJoin`, {
        scroll: false,
      });
    }

    if (selected === "alreadyJoin") {
      router.push(`/events/?pickDate=${filter.pickDate}&toggle=alreadyJoin`, {
        scroll: false,
      });
    }
  }, [selected]);

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

      if (filter.toggle === "alreadyJoin") {
        getApplyEvent().then((res) => {
          setEventCards(res.data);
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

  if (isLoading) return <LoadingComp />;

  return (
    <div className="grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
      <div className="flex flex-col">
        {currentUser && (
          <Link
            className="mb-4"
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
        <EventCalendar filter={filter} events={events} />
      </div>
      {/* isDisabled */}
      <div>
        <Tabs
          selectedKey={selected}
          onSelectionChange={(key: any) => setSelected(key)}
          className="event-tabs"
        >
          <Tab key="monthAll" title="이번 달 모든 번개">
            {eventCards.length !== 0 ? (
              <EventButtonGroups events={eventCards} />
            ) : (
              <Card>
                <CardBody>번개가 아직 없습니다.</CardBody>
              </Card>
            )}
          </Tab>

          <Tab
            isDisabled={!currentUser || currentUser?.data.role === "guest"}
            key="canJoin"
            title="참가 가능한 번개"
          >
            {eventCards.length !== 0 ? (
              <EventButtonGroups events={eventCards} />
            ) : (
              <Card>
                <CardBody>번개가 아직 없습니다.</CardBody>
              </Card>
            )}
          </Tab>
          <Tab
            isDisabled={!currentUser || currentUser?.data.role === "guest"}
            key="alreadyJoin"
            title="참가 중인 번개"
          >
            {eventCards.length !== 0 ? (
              <EventButtonGroups events={eventCards} />
            ) : (
              <Card>
                <CardBody>번개가 아직 없습니다.</CardBody>
              </Card>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
