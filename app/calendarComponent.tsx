import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { CreateEvent } from './createEvent';
import dayjs, { Dayjs } from 'dayjs';

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

      {isOpenCreateEvent && pickDate && (
        <CreateEvent pickDate={pickDate} />
      )}

      <DateCalendar value={pickDate} onChange={(newValue) => setPickDate(newValue)} />

      <div className="flex flex-col space-y-2">
        {rows.map((row, index) => {
          return (
            <div key={index} className={`hover:cursor-pointer hover:font-bold hover:opacity-100 opacity-90 drop-shadow py-2 px-4 flex flex-col justify-between mt-2 text-sm rounded-[5px] ${row.currentMember >= row.maxMember ? "bg-[#e57373]" : "bg-[#81c784]"}`}>
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

    </div>
  )
}