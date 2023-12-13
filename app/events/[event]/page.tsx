'use client';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getEvent } from "../../api";
import dayjs from "dayjs";
import Link from "next/link";
import { postJoinEvent, deleteCancelEvent, getEventAttendances } from "../../api";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from "../../style";
import { auth } from "@/firebase";

export default function Event({ params }: { params: { event: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [attendances, setAttendances] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const [canJoin, setCanJoin] = useState(false);

  const joinEvent = () => {
    postJoinEvent({ event_id: params.event }).then(() => {
      getEvent({ event_id: params.event }).then((res) => {
        setEvent(res.data);
        setCanJoin(false);
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  const cancelEvent = () => {
    deleteCancelEvent({ event_id: params.event }).then(() => {
      getEvent({ event_id: params.event }).then((res) => {
        setEvent(res.data);
        setCanJoin(true);
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  useEffect(() => {
    attendances && auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const isJoined = attendances.filter((attendance: any) => {
          return attendance.user_uid === userId;
        })
        if (isJoined.length > 0) {
          setCanJoin(false);
        } else {
          setCanJoin(true);
        }
      }
    })
  }, [attendances])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    setIsLoading(true);
    params.event && getEvent({ event_id: params.event }).then((res) => {
      setEvent(res.data);
      getEventAttendances({ event_id: params.event }).then((resp) => {
        setAttendances(resp.data);
        setIsLoading(false);
      })
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
    })
  }, [params])

  console.log(attendances);

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
          <Button variant="contained" onClick={() => openModal()}>
            {event?.current_members_count} / {event?.max_members_count}
          </Button>
          {/* attendences 안에 내 아이디가 있다면, 불참하기. 내 아이디가 없다면 참가하기 */}

          {canJoin ? <Button onClick={() => joinEvent()} variant="contained" color="info" className="ml-2">참가하기</Button> : <Button onClick={() => cancelEvent()} variant="contained" color="error" className="ml-2">불참하기</Button>}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="font-bold">참가자 목록</div>
            {
              attendances && attendances.map((attendance: any) => {
                return (
                  <div key={attendance.id}>{attendance.name}</div>
                )
              })
            }
            <Button color="error" onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div >
  ) : (
    <div></div>
  )
}

