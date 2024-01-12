'use client'
import { Button } from "@mui/material"
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { noticeLists } from "./noticeLists";
import { modalStyle } from "../style";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { LoadingComp } from "../loadingComp";
import { useRouter } from 'next/navigation';
import dayjs from "dayjs";
import Link from "next/link";

export default function NoticesPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  const handleClickNotice = ({ noticeId, canAccess }: { noticeId: number, canAccess: boolean }) => {
    if (canAccess) {
      setOpenModalId(noticeId);
      setIsModalOpen(true);
    } else {
      if (currentUser && currentUser.data.role !== "guest") {
        setOpenModalId(noticeId);
        setIsModalOpen(true);
      } else {
        alert("회원만 이용 가능합니다.");
      }
    }
  }

  return !isLoading ? (
    <div className="flex flex-col gap-4">
      {noticeLists.map((notice) => {
        return (
          <Button key={notice.id} onClick={() => handleClickNotice({ noticeId: notice.id, canAccess: notice.canAccess })} variant="outlined" color="info" size="small">{notice.title}</Button>
        )
      })}
      {
        <Button size="small" variant="outlined">
          <Link color="secondary" className="w-full no-underline text-[#0288d1]" target="_blank" href="https://gamromboard.notion.site/af19c7f8fd434d198a263590ce10c0de?pvs=4">
            슬리브 구매
          </Link>
        </Button>
      }

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="font-bold">{
              noticeLists.find((notice) => notice.id === openModalId)?.title
            }</div>
            <div dangerouslySetInnerHTML={{
              __html: noticeLists.find((notice) => notice.id === openModalId)?.content || ""
            }} className="whitespace-pre-wrap"></div>
            <Button color="error" onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>


    </div>
  ) : (
    <LoadingComp />
  )
}