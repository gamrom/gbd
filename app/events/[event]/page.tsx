'use client';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getEvent } from "../../api";
import dayjs from "dayjs";
import Link from "next/link";

export default function Event({ params }: { params: { event: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    params.event && getEvent({ event_id: params.event }).then((res) => {
      setEvent(res.data);
      setIsLoading(false);
      console.log();
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
    })
  }, [params])

  return !isLoading && event ? (
    <div className="flex flex-col px-4 mt-[50px]">
      <div className="flex justify-between">
        <span className="font-bold text-lg">{event?.title}</span>
        <Button size="small">홍보하기</Button>
      </div>
      <div className="mt-4">📆 {dayjs(event?.start_time).format(
        "YY년 MM월 DD일 HH시 mm분"
      )
      } ~ {dayjs(event?.end_time).format(
        "YY년 MM월 DD일 HH시 mm분"
      )
        }</div>
      <div className="flex justify-between mt-4">
        📍 {event?.location}
      </div>
      <div className="mt-4">👑 {event?.owner_name}</div>
      <div className="mt-4">
        {event?.description}
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex">
          <Button variant="contained" color="error">삭제하기</Button>
          <Link href={`/events/${params.event}/edit`}>
            <Button variant="contained" color="success" className="ml-2">수정하기</Button>
          </Link>
        </div>
        <div className="flex items-center">
          {event?.current_members_count} / {event?.max_members_count}
          <Button variant="contained" color="info" className="ml-2">참가하기</Button>
        </div>
      </div>
    </div >
  ) : (
    <div></div>
  )
}

