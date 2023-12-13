'use client';
import { Box, Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DISCORD_WEBHOOK_URL } from "../../../constants";
import { getActiveUsers, postCreateEvent } from "../../api";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function CreateEvent() {
  const router = useRouter();
  const pickDate = useSearchParams().get('pickDate');
  //discord
  // const pushDiscord = ({ text }: { text: string }) => {
  //   axios.post(DISCORD_WEBHOOK_URL, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     content: text
  //   })
  // }

  const [activeUsers, setActiveUsers] = useState<any>([]);
  useEffect(() => {
    getActiveUsers().then((res) => {
      setActiveUsers(res.data);
    })
  }, [])

  console.log(activeUsers);

  const formik = useFormik({
    initialValues: {
      title: "",
      location: "아지트",
      description: "",
      start_time: dayjs(pickDate),
      end_time: dayjs(pickDate),
      max_members_count: 4,
      uid: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      postCreateEvent({
        title: values.title,
        location: values.location,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time,
        max_members_count: values.max_members_count,
        uid: values.uid,
      }).then((res) => {
        // pushDiscord({
        //   text: `새로운 번개가 생성되었습니다. \n 제목: ${values.title} \n 장소: ${values.location} \n 설명: ${values.description} \n 시작시간: ${values.start_time} \n 종료시간: ${values.end_time} \n 최대인원: ${values.max_members_count} \n 호스트: ${values.owner_name}`
        // });
        // router.push('/');
        //정모생성 id response
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
      {/* <TextField name="owner_name" value={formik.values.owner_name} onChange={formik.handleChange} autoComplete='off' label="벙주/호스트" variant="outlined" defaultValue="김은식" /> */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">벙주</InputLabel>
          <Select
            name="uid"
            value={formik.values.uid}
            label="벙주"
            onChange={formik.handleChange}
          >
            {activeUsers.map((user: any) => {
              return (
                <MenuItem key={user.uid} value={user.uid}>{user.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
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