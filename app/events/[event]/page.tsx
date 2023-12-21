'use client';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getEvent } from "../../api";
import dayjs from "dayjs";
import Link from "next/link";
import { postJoinEvent, deleteCancelEvent, getEventAttendances, deleteEvent } from "../../api";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from "../../style";
import { useGetUser } from "@/app/useGetUser";
import { elapsedTime } from "@/app/tools";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
import { useGetCurrentUser } from "@/app/hooks/useGetCurrentUser";
import { LoadingComp } from "@/app/loadingComp";

export default function Event({ params }: { params: { event: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [attendances, setAttendances] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canJoin, setCanJoin] = useState(false);

  const { data: currentUser, isLoading: currentUserIsLoading } = useGetCurrentUser();

  useEffect(() => {
    if (currentUser && attendances) {
      const userId = currentUser.data.uid;
      const isJoined = attendances.filter((attendance: any) => {
        return attendance.user_uid === userId;
      })
      if (isJoined.length > 0) {
        setCanJoin(false);
      } else {
        setCanJoin(true);
      }
    }
  }, [attendances, currentUser])

  const joinEvent = () => {
    if (currentUser?.data.role !== "guest") {
      postJoinEvent({ event_id: params.event }).then(() => {
        getEvent({ event_id: params.event }).then((res) => {
          setEvent(res.data);
          setCanJoin(false);
        })
      })
    } else {
      alert("회원만 참가할 수 있습니다.")
    }
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    if (currentUser?.data.role !== "guest") {
      setIsModalOpen(true);
    } else {
      alert("회원만 참가자를 볼 수 있습니다.")
    }
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
    })
  }, [params])

  const handleClickAdvertise = () => {
    const url = window.location.href;
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast('번개 복사 완료!')
  }

  return !isLoading && !currentUserIsLoading && event ? (
    <div className="flex flex-col px-4 mt-[50px]">
      <div className="flex justify-between">
        <span className="font-bold text-lg">{event?.title}</span>
        <Button size="small" onClick={() => handleClickAdvertise()}>홍보하기</Button>
        <Toaster />
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
          {currentUser && ((currentUser.data.uid === event.owner_uid) || (currentUser.data.role === ("admin" || "manager"))) && <Button variant="contained" color="error" className="mr-2" onClick={() => {
            Swal.fire({
              title: '정말로 삭제하시겠습니까?',
              text: "삭제하시면 복구할 수 없습니다.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: '삭제하기',
              cancelButtonText: '취소하기'
            }).then((result) => {
              if (result.isConfirmed) {
                deleteEvent({ eventId: params.event }).then(() => {
                  Swal.fire({
                    title: '삭제되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인',
                  }).then(() => {
                    window.location.href = '/'
                  })
                })
              }
            })
          }}>삭제하기</Button>}
          {currentUser && ((currentUser.data.uid === event.owner_uid) || (currentUser.data.role === ("admin" || "manager"))) && (
            <Link href={`/events/${params.event}/edit`}>
              <Button variant="contained" color="success">수정하기</Button>
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="contained" onClick={() => openModal()}>
            {event?.current_members_count} / {event?.max_members_count}
          </Button>
          {currentUser && currentUser.data.uid !== event.owner_uid && (canJoin ? <Button onClick={() => joinEvent()} variant="contained" color="info" className="ml-2">참가하기</Button> : <Button onClick={() => cancelEvent()} variant="contained" color="error" className="ml-2">불참하기</Button>)}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="font-bold">참가자 목록</div>
            {
              attendances && attendances.map((attendance: any) => {
                return (
                  <div key={attendance.id} className="flex justify-between">
                    <div>{attendance.user_name}</div>
                    <div className="ml-2">{elapsedTime(attendance.created_at)}</div>
                  </div>
                )
              })
            }
            <Button color="error" onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div >
  ) : (
    <LoadingComp />
  )
}

