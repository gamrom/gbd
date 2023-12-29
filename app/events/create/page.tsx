'use client';
import { Box, Button, Modal, TextField } from "@mui/material";
import { getActiveUsers, postCreateEvent } from "../../api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetCurrentUser } from "@/app/hooks/useGetCurrentUser";
import { DatePickerComp } from "../[event]/edit/DatePickerComp";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "axios";


export default function CreateEvent() {
  const pickDate: any = useSearchParams().get('pickDate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  //discord
  const pushDiscord = ({ text }: { text: string }) => {
    process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL && axios.post(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      content: text
    })
  }

  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    getActiveUsers().then((res) => {
      setActiveUsers(res.data);
    })
  }, [])

  const [formState, setFormState] = useState<any>({
    title: "",
    location: "아지트",
    description: "",
    start_time: "",
    end_time: "",
    max_members_count: 4,
    uid: "",
  })

  useEffect(() => {
    if (currentUser && currentUser.data.role !== ("manager" || "admin")) {
      setFormState({
        ...formState,
        uid: currentUser.data.uid,
      })
    }
  }, [currentUser])

  const [timeState, setTimeState] = useState<any>({})
  useEffect(() => {
    if (pickDate) {
      setTimeState({
        startTime: dayjs(pickDate),
        endTime: dayjs(pickDate),
      })
    }
  }, [pickDate])

  const handleSubmit = () => {
    if ((timeState.startTime || timeState.endTime) == null) {
      alert("시간을 입력해주세요.")
      return;
    } else if (timeState.startTime.isAfter(timeState.endTime)) {
      alert("시작시간이 종료시간보다 늦습니다.")
      return;
    } else if (timeState.startTime.isSame(timeState.endTime)) {
      alert("시작시간과 종료시간이 같습니다.")
      return;
    } else if (timeState.endTime.isBefore(timeState.startTime)) {
      alert("시작시간이 현재시간보다 빠릅니다.")
      return;
    } else if (formState.title == "") (
      alert("제목을 입력해주세요.")
    )
    else if (
      formState.location == ""
    ) {
      alert("장소를 입력해주세요.")
    } else if (
      formState.description == ""
    ) {
      alert("설명을 입력해주세요.")
    } else if (
      formState.max_members_count == ""
    ) {
      alert("최대인원을 입력해주세요.")
    } else if (
      formState.max_members_count < 1
    ) {
      alert("최대인원은 1명 이상이어야 합니다.")
    } else {
      postCreateEvent({
        title: formState.title,
        location: formState.location,
        description: formState.description,
        start_time: timeState.startTime,
        end_time: timeState.endTime,
        max_members_count: formState.max_members_count,
        uid: formState.uid,
      }).then((res) => {
        setIsSubmitting(true);
        pushDiscord({
          text: `새로운 번개가 생성되었습니다. \n 제목: ${formState.title} \n 장소: ${formState.location} \n 설명: ${formState.description} \n 시작시간: ${formState.startTime} \n 종료시간: ${formState.endTime} \n 최대인원: ${formState.max_members_count}`
        });
        Swal.fire({
          icon: 'success',
          title: '일정이 생성되었습니다.',
          showConfirmButton: false,
        }).then(() => {
          location.href = `/events/${res.data.id}`
        })
      }).catch((error) => {
        alert("일정 생성에 실패했습니다.")
      })
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="font-bold text-lg">일정 생성</div>
      <TextField name="title" value={formState.title} onChange={(e) => setFormState(
        {
          ...formState,
          title: e.target.value
        }
      )} autoComplete='off' label="일정 제목" variant="outlined" />
      <TextField name="location" value={formState.location} onChange={(e) => {
        setFormState({
          ...formState,
          location: e.target.value
        })

      }} autoComplete='off' label="일정 장소" variant="outlined" />
      {
        currentUser &&
        (((currentUser.data.role === "admin") || (currentUser.data.role === "manager")) ? (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>벙주</InputLabel>
              <Select
                name="uid"
                value={formState.uid}
                label="벙주"
                onChange={
                  (e) => {
                    setFormState({
                      ...formState,
                      uid: e.target.value
                    })
                  }
                }
              >
                {activeUsers.map((user: any) => {
                  return (
                    <MenuItem key={user.uid} value={user.uid}>{user.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <TextField disabled defaultValue={currentUser.data.name} autoComplete='off' label="벙주/호스트" variant="outlined" />
        ))
      }
      <TextField name="description" value={formState.description} onChange={(e) => {
        setFormState({
          ...formState,
          description: e.target.value
        })
      }} autoComplete='off' label="일정 내용" variant="outlined" multiline placeholder='번개 상세한 설명을 적어주세요.' />

      <DateTimePicker label="시작 시간" value={timeState.startTime} onChange={(newValue) => setTimeState({ ...timeState, startTime: newValue })} />
      <DateTimePicker label="종료 시간" value={timeState.endTime} onChange={(newValue) => (
        setTimeState({ ...timeState, endTime: newValue })
      )} />

      <TextField
        label="모집 인원 (벙주/호스트 포함)"
        type="number"

        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={formState.max_members_count}
        onChange={(e) => {
          setFormState({
            ...formState,
            max_members_count: e.target.value
          })
        }}
        name="max_members_count"
      />
      <Button disabled={isSubmitting} type="button" variant='contained' color="success" onClick={() => handleSubmit()}>완료하기</Button>
      <Button type="button" color="error">취소</Button>
    </div>
  )
}