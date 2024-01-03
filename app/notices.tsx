import { Button } from "@mui/material"
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { noticeLists } from "./noticeLists";
import { modalStyle } from "./style";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";
import { LoadingComp } from "./loadingComp";
import { useRouter } from 'next/navigation';
import dayjs from "dayjs";
import { useEffect } from "react";
import Link from "next/link";

export const Notices = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const [isSpecialModalOpen, setIsSpecialModalOpen] = useState<boolean>(false);

  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  const [canJoin, setCanJoin] = useState<boolean>(false);
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    const today = dayjs();
    const last7th = dayjs().endOf('month').subtract(7, 'day');

    if (today.isBefore(last7th)) {
      setCanJoin(false);
      const timer = setInterval(() => {
        const remainingTime = last7th.diff(dayjs(), 'second');

        if (remainingTime <= 0) {
          clearInterval(timer);
        } else {
          const days = Math.floor(remainingTime / (60 * 60 * 24));
          const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
          const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
          const seconds = remainingTime % 60;

          setCountdown(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanJoin(true);
    }
  }, [isModalOpen]);

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
    <div className="grid grid-cols-2 gap-2">
      {
        !isLoading && (currentUser ? (
          <Button onClick={() => setIsSpecialModalOpen(true)} variant="contained" size="small" color="secondary">
            신규지원/연장하기
          </Button>
        ) : (
          //회원가입 후 지원하기 버튼
          <Button onClick={() => router.push('/login')} variant="contained" size="small" color="secondary">
            로그인 후 지원하기
          </Button>
        ))
      }
      {noticeLists.map((notice) => {
        return (
          <Button key={notice.id} onClick={() => handleClickNotice({ noticeId: notice.id, canAccess: notice.canAccess })} variant="outlined" color="info" size="small">{notice.title}</Button>
        )
      })}
      {
        <Button size="small" variant="outlined">
          <Link color="secondary" className="no-underline text-[#0288d1]" target="_blank" href="https://gamromboard.notion.site/af19c7f8fd434d198a263590ce10c0de?pvs=4">
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

      <Modal
        open={isSpecialModalOpen}
        onClose={() => setIsSpecialModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            {canJoin && (
              <div className="flex flex-col">
                <div className="text-center font-bold mb-2 text-lg">지원가능 기간입니다.</div>
                <div>지원 전 회칙을 반드시 확인해주세요.</div>
                <a href="https://gamromboard.notion.site/290766405fa14166bcd829f3afa8a9ba?pvs=4" target="_blank">회칙 보러가기</a>
                <div>지원 후 3개월동안 활동하게 됩니다.</div>
                <div className="font-bold mt-2 text-lg">지원 방법</div>
                <div>다음 계좌로 회비 45000원 입금해주시면 지원 완료됩니다.</div>
                <div>김은식 카카오뱅크 3333-03-5130993</div>
                <div className="mt-2">가입 승인은 매달 마지막날 ~ 다음달 1일 중 처리됩니다.</div>
                <div>가입 완료되신분들은 카톡방에 초대해드리고 있습니다.</div>
                <div>아지트 포화 등의 이유로 가입에 제한이 있을 수 있습니다.</div>
                <div>추가 문의사항은 인스타그램으로 부탁드립니다.</div>
              </div>
            )}

            {!canJoin && (
              <div className="flex flex-col items-center justify-center">
                <div className="font-bold text-lg mb-2">지원 기간이 아닙니다.</div>
                <div>매달 마지막 7일 동안 지원이 가능합니다.</div>
                {countdown && <div className="flex items-center justify-center">지원 가능까지 남은시간 : {countdown}</div>}
              </div>
            )}

            <Button color="error" onClick={() => setIsSpecialModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div>
  ) : (
    <LoadingComp />
  )
}