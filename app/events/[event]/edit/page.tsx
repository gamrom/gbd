'use client';
import { Box, Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import { DateTimePicker } from "@mui/x-date-pickers";
import { getActiveUsers, patchEvent, getEvent } from "../../../api";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Link from "next/link";
import NativeSelect from '@mui/material/NativeSelect';
import { LoadingComp } from "@/app/loadingComp";
import { DatePickerComp } from "./DatePickerComp";


export default function PatchEvent({ params }: { params: { event: string } }) {
  const [event, setEvent] = useState<any>({});

  useEffect(() => {
    getEvent({ event_id: params.event }).then((res) => {
      setEvent({
        current_members_count: res.data.current_members_count,
        description: res.data.description,
        end_time: dayjs(res.data.end_time),
        event_id: res.data.event_id,
        location: res.data.location,
        max_members_count: res.data.max_members_count,
        owner_name: res.data.owner_name,
        owner_uid: res.data.owner_uid,
        start_time: dayjs(res.data.start_time),
        title: res.data.title,
      })
    })
  }, [])

  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    getActiveUsers().then((res: any) => {
      setActiveUsers(res.data);
    })
  }, [])

  const [timeState, setTimeState] = useState<any>({})
  useEffect(() => {
    if (event.start_time && event.end_time) {
      setTimeState({
        startTime: event.start_time,
        endTime: event.end_time,
      })
    }
  }, [event])

  const handleSubmit = () => {
    if (event.start_time.isAfter(event.end_time)) {
      alert("시작시간이 종료시간보다 늦습니다.")
      return;
    } else if (event.start_time.isSame(event.end_time)) {
      alert("시작시간과 종료시간이 같습니다.")
      return;
    } else if (event.end_time.isBefore(event.start_time)) {
      alert("시작시간이 현재시간보다 빠릅니다.")
      return;
    } else if (event.title === "" || event.location === "" || event.uid === "") {
      alert("빈값이 있습니다.")
      return;
    } else if (event.max_members_count < 1) {
      alert("본인도 포함한 인원을 입력해주세요.")
      return;
    } else {
      patchEvent({
        title: event.title,
        location: event.location,
        description: event.description,
        start_time: event.start_time,
        end_time: event.end_time,
        max_members_count: event.max_members_count,
        uid: event.uid,
        event_id: params.event
      }).then((res: any) => {
        Swal.fire({
          icon: 'success',
          title: '수정 완료',
          text: '일정이 수정되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          location.href = `/events/${params.event}`
        })
      }).catch((error) => {
        alert("일정 수정에 실패했습니다.")
      })
    }
  }

  return event ? (
    <div className="flex flex-col space-y-4">
      <div className="font-bold text-lg">일정 수정</div>
      <TextField InputLabelProps={{ shrink: true }} name="title" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} autoComplete='off' label="일정 제목" variant="outlined" />
      <TextField InputLabelProps={{ shrink: true }} name="location" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} autoComplete='off' label="일정 장소" variant="outlined" />
      {/* <TextField name="owner_name" value={event.owner_name} onChange={formik.handleChange} autoComplete='off' label="벙주/호스트" variant="outlined" defaultValue="김은식" /> */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel shrink htmlFor="owner_uid" variant="standard">벙주</InputLabel>

          <NativeSelect
            name="uid"
            value={event.uid}
            onChange={(e) => {
              setEvent({ ...event, uid: e.target.value })
            }}
            inputProps={{
              name: 'uid',
              id: 'owner_uid',
            }}
          >
            {activeUsers.map((user: any) => {
              return (
                user.uid === event.owner_uid ? <option key={user.uid} value={user.uid} selected>{user.name}</option> : <option key={user.uid} value={user.uid}>{user.name}</option>
              )
            })}
          </NativeSelect>
        </FormControl>
      </Box>
      <TextField InputLabelProps={{ shrink: true }} name="description" value={event.description} onChange={
        (e) => setEvent({ ...event, description: e.target.value })
      } autoComplete='off' label="일정 내용" variant="outlined" multiline placeholder='번개 상세한 설명을 적어주세요.' />

      {
        timeState.startTime && timeState.endTime && (
          <DatePickerComp
            timeState={timeState}
            setTimeState={setTimeState}
          />
        )
      }

      <TextField
        label="모집 인원 (벙주/호스트 포함)"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={event.max_members_count}
        onChange={(e) => setEvent({ ...event, max_members_count: e.target.value })}
        name="max_members_count"
      />
      <Button type="button" onClick={() => handleSubmit()} variant='contained' color="success">완료하기</Button>
      <Link
        href={`/events/${params.event}`}
        className="flex items-center justify-center w-full no-underline"
      >
        <Button color="error">
          취소
        </Button>
      </Link>
    </div>
  ) : (
    <LoadingComp />
  )
}