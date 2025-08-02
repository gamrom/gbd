"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getEvent } from "../../api";
import dayjs from "dayjs";
import Link from "next/link";
import {
  postJoinEvent,
  deleteCancelEvent,
  getEventAttendances,
  deleteEvent,
} from "../../api";

import { elapsedTime, pushDiscord } from "@/app/tools";
import Swal from "sweetalert2";
import { useGetCurrentUser } from "@/app/hooks/useGetCurrentUser";
import { LoadingComp } from "@/app/_components/LoadingComp";
import axios from "axios";

export const Content = ({ params }: { params: { event: string } }) => {
  const [event, setEvent] = useState<any>(null);
  const [attendances, setAttendances] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canJoin, setCanJoin] = useState(false);

  const { data: currentUser, isLoading: currentUserIsLoading } =
    useGetCurrentUser();

  useEffect(() => {
    if (currentUser && attendances) {
      const userId = currentUser.data.uid;
      const isJoined = attendances.filter((attendance: any) => {
        return attendance.user_uid === userId;
      });
      if (isJoined.length > 0) {
        setCanJoin(false);
      } else {
        setCanJoin(true);
      }
    }
  }, [attendances, currentUser]);

  const joinEvent = () => {
    if (currentUser?.data.role !== "guest") {
      postJoinEvent({ event_id: params.event }).then(() => {
        getEvent({ event_id: params.event }).then((res) => {
          setEvent(res.data);
          setCanJoin(false);
        });
      });
    } else {
      alert("회원만 참가할 수 있습니다.");
    }
  };

  const cancelEvent = () => {
    deleteCancelEvent({ event_id: params.event }).then(() => {
      getEvent({ event_id: params.event })
        .then((res) => {
          setEvent(res.data);
          setCanJoin(true);
        })
        .catch((err) => {
          alert("참가 취소에 실패했습니다.");
        });
    });
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    if (currentUser && currentUser.data.role !== "guest") {
      setIsModalOpen(true);
    } else {
      alert("회원만 참가자를 볼 수 있습니다.");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    params.event &&
      getEvent({ event_id: params.event })
        .then((res) => {
          setEvent(res.data);
          getEventAttendances({ event_id: params.event }).then((resp) => {
            setAttendances(resp.data);
            setIsLoading(false);
          });
        })
        .catch((err) => {
          setIsLoading(false);
        });
  }, [params]);

  const handleClickAdvertise = () => {
    const url = window.location.href;
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  return !isLoading && !currentUserIsLoading && event ? (
    <Card className="mx-4">
      <CardHeader className="flex justify-between gap-8">
        <span className="text-lg font-bold">{event?.title}</span>

        <Popover placement="bottom" onOpenChange={handleClickAdvertise}>
          <PopoverTrigger>홍보하기</PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">주소 복사완료</div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <Divider />
      <CardBody>
        📆{" "}
        {dayjs(event?.start_time.replace(/-/g, "/")).format(
          "YY.MM.DD HH시 mm분"
        )}{" "}
        ~{" "}
        {dayjs(event?.end_time.replace(/-/g, "/")).format("YY.MM.DD HH시 mm분")}
      </CardBody>
      <Divider />
      <CardBody className="flex flex-row justify-between">
        <div>👑 {event?.owner_name}</div>
        <div>📍 {event?.location}</div>
      </CardBody>

      <Divider />
      <CardBody className="leading-normal break-all whitespace-pre-line">
        {event?.description}
      </CardBody>

      {currentUser &&
        (currentUser.data.uid === event.owner_uid ||
          currentUser.data.role === "admin" ||
          currentUser.data.role === "manager") && (
          <>
            <Divider />
            <CardBody className="flex flex-row justify-end gap-2">
              <Button
                variant="bordered"
                color="danger"
                className="text-xs w-fit"
                onClick={() => {
                  Swal.fire({
                    title: "정말로 삭제하시겠습니까?",
                    text: "삭제하시면 복구할 수 없습니다.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "삭제하기",
                    cancelButtonText: "취소하기",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // 삭제 전에 Discord로 삭제 알림 보내기
                      process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL_PRIVATE &&
                        axios.post(
                          process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL_PRIVATE,
                          {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                            content: `------------------------------\n번개가 삭제되었습니다. \n제목: ${event.title} \n장소: ${event.location} \n벙주: ${event.owner_name} \n설명: ${event.description} \n시작시간: ${dayjs(
                              event.start_time
                            ).format("YY-MM-DD HH:mm")} \n종료시간: ${dayjs(
                              event.end_time
                            ).format(
                              "YY-MM-DD HH:mm"
                            )}  \n최대인원: ${event.max_members_count}
            `,
                          }
                        );

                      deleteEvent({ eventId: params.event }).then(() => {
                        Swal.fire({
                          title: "삭제되었습니다.",
                          icon: "success",
                          confirmButtonText: "확인",
                        }).then(() => {
                          window.location.href = "/";
                        });
                      });
                    }
                  });
                }}
              >
                삭제하기
              </Button>

              <Link href={`/events/${params.event}/edit`}>
                <Button variant="bordered" color="success" className="text-xs">
                  수정하기
                </Button>
              </Link>
            </CardBody>
          </>
        )}
      <Divider />
      <CardFooter className="flex justify-between">
        <Button onClick={() => openModal()}>참가자 보기</Button>
        <Chip
          variant={
            event?.current_members_count >= event?.max_members_count
              ? "solid"
              : "bordered"
          }
          color={
            event?.current_members_count >= event?.max_members_count
              ? "danger"
              : "success"
          }
          className={`ml-auto ${
            event?.current_members_count >= event?.max_members_count
              ? "text-white"
              : "text-black"
          }`}
        >
          {event?.current_members_count} / {event?.max_members_count}
        </Chip>
        {currentUser &&
          currentUser.data.uid !== event.owner_uid &&
          (canJoin ? (
            event?.current_members_count >= event?.max_members_count ? (
              <Button
                onClick={() => joinEvent()}
                color="danger"
                isDisabled
                className="ml-2 text-white"
              >
                마감
              </Button>
            ) : (
              <Button
                onClick={() => joinEvent()}
                color="success"
                className="ml-2 text-white"
              >
                참가하기
              </Button>
            )
          ) : (
            <Button
              onClick={() => cancelEvent()}
              color="danger"
              className="ml-2"
            >
              불참하기
            </Button>
          ))}
      </CardFooter>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent className="pb-4">
          <ModalHeader>
            <div className="font-bold">참가자 목록</div>
          </ModalHeader>
          <ModalBody>
            {attendances &&
              //orderby created_at
              attendances
                .sort((a: any, b: any) => {
                  return (
                    new Date(a.created_at.replace(/-/g, "/")).getTime() -
                    new Date(b.created_at.replace(/-/g, "/")).getTime()
                  );
                })
                .map((attendance: any) => {
                  return (
                    <div key={attendance.id} className="flex justify-between">
                      <div>
                        {attendance.user_uid === event.owner_uid && "👑"}{" "}
                        {attendance.user_name}
                      </div>
                      <div className="ml-2">
                        {elapsedTime(attendance.created_at.replace(/-/g, "/"))}
                      </div>
                    </div>
                  );
                })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  ) : (
    <LoadingComp />
  );
};
