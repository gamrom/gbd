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


export default function PatchEvent({ params }: { params: { event: string } }) {
  const [event, setEvent] = useState<any>({});

  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    getActiveUsers().then((res: any) => {
      setActiveUsers(res.data);
    })
  }, [])


  const formik = useFormik({
    initialValues: {
      title: event.title,
      location: event.location,
      description: event.description,
      start_time: event.start_time && dayjs(event.start_time),
      end_time: event.end_time && dayjs(event.end_time),
      max_members_count: 4,
      uid: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('필수 입력사항입니다.'),
      location: Yup.string().required('필수 입력사항입니다.'),
      max_members_count: Yup.number().min(1, "본인도 포함해야합니다.").required('필수 입력사항입니다.'),
      uid: Yup.string().required('필수 입력사항입니다.'),
    }),
    onSubmit: (values) => {
      if (values.start_time.isAfter(values.end_time)) {
        alert("시작시간이 종료시간보다 늦습니다.")
        return;
      } else if (values.start_time.isSame(values.end_time)) {
        alert("시작시간과 종료시간이 같습니다.")
        return;
      } else if (values.end_time.isBefore(values.start_time)) {
        alert("시작시간이 현재시간보다 빠릅니다.")
        return;
      } else {
        patchEvent({
          title: values.title,
          location: values.location,
          description: values.description,
          start_time: values.start_time,
          end_time: values.end_time,
          max_members_count: values.max_members_count,
          uid: values.uid,
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
        })
      }
    },
  })


  useEffect(() => {
    params.event && getEvent({ event_id: params.event }).then((res) => {
      setEvent(res.data);
    })
    formik.setFieldValue("uid", event.uid)
  }, [params])

  return event ? (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
      <div className="font-bold text-lg">일정 수정</div>
      <TextField InputLabelProps={{ shrink: true }} name="title" value={formik.values.title} onChange={formik.handleChange} autoComplete='off' label="일정 제목" variant="outlined" />
      <TextField InputLabelProps={{ shrink: true }} name="location" value={formik.values.location} onChange={formik.handleChange} autoComplete='off' label="일정 장소" variant="outlined" />
      {/* <TextField name="owner_name" value={formik.values.owner_name} onChange={formik.handleChange} autoComplete='off' label="벙주/호스트" variant="outlined" defaultValue="김은식" /> */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel shrink htmlFor="owner_uid" variant="standard">벙주</InputLabel>

          <NativeSelect
            name="uid"
            value={formik.values.uid}
            onChange={(e) => {
              formik.setFieldValue("uid", e.target.value)
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
      <TextField InputLabelProps={{ shrink: true }} name="description" value={formik.values.description} onChange={formik.handleChange} autoComplete='off' label="일정 내용" variant="outlined" multiline placeholder='번개 상세한 설명을 적어주세요.' />
      <DateTimePicker label="시작 시간" value={formik.values.start_time} onChange={(newValue) => formik.setFieldValue("start_time", newValue)} />
      <DateTimePicker label="종료 시간" value={formik.values.end_time} onChange={(newValue) => formik.setFieldValue("end_time", newValue)} />
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
      {
        formik.errors.max_members_count && formik.touched.max_members_count && (
          <div className="text-[#FF0000] text-xs !mt-px">{formik.errors.max_members_count}</div>
        )
      }
      <Button type="submit" variant='contained' color="success">완료하기</Button>
      <Link
        href={`/events/${params.event}`}
        className="flex items-center justify-center w-full no-underline"
      >
        <Button color="error">
          취소
        </Button>
      </Link>
    </form>
  ) : (
    <div></div>
  )
}