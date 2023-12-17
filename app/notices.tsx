import { Button } from "@mui/material"
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { noticeLists } from "./noticeLists";
import { modalStyle } from "./style";
import { useGetUser } from "./useGetUser";

export const Notices = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const currentUser = useGetUser();

  return (
    <div className="grid grid-cols-2 gap-2">
      {noticeLists.map((notice) => {
        return (
          <Button key={notice.id} onClick={() => {
            setOpenModalId(notice.id);
            setIsModalOpen(true);
          }} variant="contained" color="info" size="small">{notice.title}</Button>
        )
      })}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
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
  )
}