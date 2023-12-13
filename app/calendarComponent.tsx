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
import { eventLists } from "./seed";
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { useFormik } from 'formik';


function createData(
  date: string,
  currentMember: number,
  maxMember: number,
  partyCreator: string,
  title: string,
) {
  return { date, currentMember, maxMember, partyCreator, title };
}

export const CalendarComponent = () => {
  const [toggleFilter, setToggleFilter] = useState<string | null>('monthAll');

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: string | null,
  ) => {
    setToggleFilter(newToggle)
  };



  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState<boolean>(false);
  const [pickDate, setPickDate] = useState<Dayjs | any>(dayjs());

  const [capacity, setCapacity] = useState<number | undefined>(1);

  const [events, setEvents] = useState<Array<{
    id: number,
    start_time: any,
    end_time: any,
    title: string
    location: string,
    owner_name: string,
    max_members_count: number,
    current_members_count: number,
  }>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("call")
    setIsLoading(true);
    axios.get("http://172.30.1.47:3000/events", {
      params: {
        year: pickDate?.year(),
        month: pickDate?.month() + 1,
      }
    }).then((res) => {
      setEvents(res.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [pickDate.year(), pickDate.month()])

  //번개생성
  const [startTime, setStartTime] = useState<any>(dayjs());
  const [endTime, setEndTime] = useState<any>(dayjs());

  const formik = useFormik({
    initialValues: {
      title: "",
      location: "아지트",
      description: "",
      start_time: "",
      end_time: "",
      max_members_count: 4,
      owner_name: "감롬",
    },
    onSubmit: (values) => {
      axios.post(`${BACKEND_URL}/events`, {
        title: values.title,
        location: values.location,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time,
        max_members_count: values.max_members_count,
        user_id: 1,
      }).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      })
    },
  })


  const pushDiscord = () => {
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1184078170375323688/HPKeG3xbr9MwwMKKV6Cj11rLP-Z-W-U2YD5kJd2Am-AORyZN9GBUTGDZt-_n6FKLJ_mo';
    axios.post(DISCORD_WEBHOOK_URL, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      content: "메시지발송성공"
    })
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
        <ToggleButton className="w-full text-xs" color="secondary" value="monthAll" aria-label="left aligned">
          이번달 모든 번개
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

      <Button onClick={pushDiscord}>버튼만들기</Button>

      <Modal
        open={isOpenCreateEvent}
        onClose={() => setIsOpenCreateEvent(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modalStyle}>
          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
            <div className="font-bold text-lg">일정 생성</div>
            <TextField name="title" value={formik.values.title} onChange={formik.handleChange} autoComplete='off' label="일정 제목" variant="outlined" />
            <TextField name="location" value={formik.values.location} onChange={formik.handleChange} autoComplete='off' label="일정 장소" variant="outlined" defaultValue="아지트" />
            <TextField name="owner_name" value={formik.values.owner_name} onChange={formik.handleChange} autoComplete='off' label="벙주/호스트" variant="outlined" defaultValue="김은식" />
            <TextField name="description" value={formik.values.description} onChange={formik.handleChange} autoComplete='off' label="일정 내용" variant="outlined" multiline placeholder='번개 상세한 설명을 적어주세요.' />
            <DateTimePicker label="시작 시간" value={startTime} onChange={(newValue) => formik.setFieldValue("start_time", newValue)} />
            <DateTimePicker label="종료 시간" value={endTime} onChange={(newValue) => formik.setFieldValue("end_time", newValue)} />
            <TextField
              label="모집 인원 (벙주/호스트 포함)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={formik.values.max_members_count}
              onChange={formik.handleChange}
              name="max_members_count"
            />
            <Button type="submit" variant='contained' color="success">완료하기</Button>
            <Button color="error">취소</Button>
          </form>
        </Box>
      </Modal>

      <DateCalendar value={pickDate} onChange={(newValue) => setPickDate(newValue)} />

      {!isLoading && <div className="flex flex-col space-y-2">
        {events && events.map((event: any, index: number) => {
          return (
            <Link key={index} href={`/events/${event.id}`} className="no-underline text-black">
              <div className={`hover:cursor-pointer hover:font-bold hover:opacity-100 opacity-90 drop-shadow py-2 px-4 flex flex-col justify-between mt-2 text-sm rounded-[5px] ${event.current_members_count >= event.max_members_count ? "bg-[#e57373]" : "bg-[#81c784]"}`}>
                <div className="flex justify-between w-full">
                  <div className="flex space-x-4 w-full">
                    <div>{dayjs(event.start_time).format('YY/MM/DD')}</div>
                    <div>{event.current_members_count}/{event.max_members_count}</div>
                  </div>
                  <div className="shrink-0">{event.owner_name}</div>
                </div>
                <div className="truncate">{event.title}</div>
              </div>
            </Link>
          )
        }
        )}
      </div>}

    </div>
  )
}