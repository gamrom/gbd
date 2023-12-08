import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateCalendar, DateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { modalStyle } from './style';


function createData(
  date: string,
  currentMember: number,
  maxMember: number,
  partyCreator: string,
  title: string,
) {
  return { date, currentMember, maxMember, partyCreator, title };
}

const rows = [
  createData('23.12.01', 1, 5, '김은식', "김김김보드게임번개모집합니다 전략하실분 환영"),
  createData('23.12.05', 1, 5, '노종원', "노김보드게임번개모집합니다 전략하실분 환영"),
  createData('23.12.05', 5, 5, '부원1', "부원이모집합니다보드게임번개모집합니다 전략하실분 환영"),
];

export const CalendarComponent = () => {
  const [toggleFilter, setToggleFilter] = useState<string | null>('canJoin');

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string | null,
  ) => {
    setToggleFilter(newToggle)
  };


  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState<boolean>(false);
  const [pickDate, setPickDate] = useState<Dayjs | null>(dayjs());

  const [capacity, setCapacity] = useState<number | undefined>(1);


  const [isEventDetailOpen, setIsEventDetailOpen] = useState<boolean>(false);
  const seeDetail = () => {
    setIsEventDetailOpen(true);
  }

  return (
    <div>
      <ToggleButtonGroup
        value={toggleFilter}
        exclusive
        onChange={handleFilter}
        size="small"
        className="w-full mt-4"
      >
        <ToggleButton className="w-full text-xs" color="secondary" value="leftAll" aria-label="left aligned">
          다가올 모든 번개
        </ToggleButton>
        <ToggleButton className="w-full text-xs" color="secondary" value="canJoin" aria-label="left aligned">
          참석가능 번개
        </ToggleButton>
        <ToggleButton className="w-full text-xs" color="secondary" value="alreadyJoin" aria-label="centered">
          참가중인 번개
        </ToggleButton>
      </ToggleButtonGroup>

      <div className="flex items-center justify-center">
        <Button
          variant="contained"
          className="mt-4 mx-auto text-center"
          color="success"
          onClick={() => setIsOpenCreateEvent(true)}
        >번개 생성</Button>
      </div>

      <Modal
        open={isOpenCreateEvent}
        onClose={() => setIsOpenCreateEvent(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="font-bold text-lg">일정 생성</div>
            <TextField autoComplete='off' label="일정 제목" variant="outlined" />
            <TextField autoComplete='off' label="일정 장소" variant="outlined" defaultValue="아지트" />
            <TextField autoComplete='off' label="벙주/호스트" variant="outlined" defaultValue="김은식" />
            <TextField autoComplete='off' label="일정 내용" variant="outlined" multiline placeholder='번개 상세한 설명을 적어주세요.' />
            <DateTimePicker label="시작 시간" defaultValue={dayjs()} />
            <DateTimePicker label="종료 시간" defaultValue={dayjs()} />
            <TextField
              label="모집 인원 (벙주/호스트 포함)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <Button variant='contained' color="success">완료하기</Button>
            <Button color="error">취소</Button>
          </div>
        </Box>
      </Modal>

      <DateCalendar value={pickDate} onChange={(newValue) => setPickDate(newValue)} />

      <div className="flex flex-col space-y-2">
        {rows.map((row, index) => {
          return (
            <div onClick={seeDetail} key={index} className={`hover:cursor-pointer hover:font-bold hover:opacity-100 opacity-90 drop-shadow py-2 px-4 flex flex-col justify-between mt-2 text-sm rounded-[5px] ${row.currentMember >= row.maxMember ? "bg-[#e57373]" : "bg-[#81c784]"}`}>
              <div className="flex justify-between w-full">
                <div className="flex space-x-4 w-full">
                  <div>{row.date}</div>
                  <div>{row.currentMember}/{row.maxMember}</div>
                </div>
                <div className="shrink-0">{row.partyCreator}</div>
              </div>
              <div className="truncate">{row.title}</div>
            </div>
          )
        }
        )}
      </div>

      <Modal
        open={isEventDetailOpen}
        onClose={() => setIsEventDetailOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex flex-col space-y-4">
            <div className="font-bold">{
              noticeLists.find((notice) => notice.id === openModalId)?.title
            }</div>
            <div>{
              noticeLists.find((notice) => notice.id === openModalId)?.content
            }</div>
            <Button color="error" onClick={() => setIsModalOpen(false)}>닫기</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}