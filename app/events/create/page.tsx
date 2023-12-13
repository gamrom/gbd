'use client';
import { Box, Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DISCORD_WEBHOOK_URL } from "../../../constants";
import { postCreateEvent } from "../../api";


export default function CreateEvent() {
  //discord
  // const pushDiscord = ({ text }: { text: string }) => {
  //   axios.post(DISCORD_WEBHOOK_URL, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     content: text
  //   })
  // }

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
      postCreateEvent({
        title: values.title,
        location: values.location,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time,
        max_members_count: values.max_members_count,
        user_id: 1,
      }).then((res) => {
        pushDiscord({
          text: `새로운 번개가 생성되었습니다. \n 제목: ${values.title} \n 장소: ${values.location} \n 설명: ${values.description} \n 시작시간: ${values.start_time} \n 종료시간: ${values.end_time} \n 최대인원: ${values.max_members_count} \n 호스트: ${values.owner_name}`
        });
      }).catch((error) => {
        console.log(error);
      })
    },
  })

  return (
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
  )
}