'use client';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getEvent, patchEvent } from "../../../api";
import dayjs from "dayjs";
import Link from "next/link";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function Event({ params }: { params: { event: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: event?.title,
      location: event?.location,
      description: event?.description,
      start_time: dayjs(event?.start_time),
      end_time: dayjs(event?.end_time),
      max_members_count: event?.max_members_count,
      user_id: event?.user_id,
      owner_name: event?.owner_name,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      patchEvent({
        event_id: params.event,
        title: values.title,
        location: values.location,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time,
        max_members_count: values.max_members_count,
        user_id: values.user_id,
      }).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      })
    }
  })

  useEffect(() => {
    setIsLoading(true);
    params.event && getEvent({ event_id: params.event }).then((res) => {
      setEvent(res.data);
      setIsLoading(false);
      console.log();
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
    })
  }, [params])

  return !isLoading && event ? (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
      <div className="font-bold text-lg">일정 생성</div>
      <TextField name="title" value={formik.values.title} onChange={formik.handleChange} autoComplete='off' label="일정 제목" variant="outlined" />
      <TextField name="location" value={formik.values.location} onChange={formik.handleChange} autoComplete='off' label="일정 장소" variant="outlined" defaultValue="아지트" />
      <TextField name="owner_name" value={formik.values.owner_name} onChange={formik.handleChange} autoComplete='off' label="벙주/호스트" variant="outlined" defaultValue="김은식" />
      <TextField name="description" value={formik.values.description} onChange={formik.handleChange} autoComplete='off' label="일정 내용" variant="outlined" multiline placeholder='번개 상세한 설명을 적어주세요.' />
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
      <Button type="submit" variant='contained' color="success">완료하기</Button>
      <Button color="error">취소</Button>
    </form>
  ) : (
    <div></div>
  )
}

