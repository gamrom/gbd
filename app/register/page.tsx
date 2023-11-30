'use client'
import { TextField, ToggleButtonGroup, ToggleButton, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from "next/link"


const funnelsArray = [
  "지인",
  "인스타그램",
  "에브리타임",
  "캠퍼스픽",
  "당근마켓",
  "보드게임 커뮤니티",
  "기타",
]

export default function Login() {
  const [funnels, setFunnels] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setFunnels(event.target.value as string);
  };

  const [gender, setGender] = useState<string | null>('left');
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string | null,
  ) => {
    setGender(newGender);
  };


  return (
    <div className="space-y-4 flex flex-col mx-auto mt-[100px] max-w-[360px]">
      <TextField autoComplete='off' size="small" id="email" label="이메일(아이디)" variant="outlined" />
      <TextField autoComplete='off' size="small" id="pw" label="비밀번호" variant="outlined" type="password" placeholder="최소 8자 이상" />
      <TextField autoComplete='off' size="small" id="pwConfirm" label="비밀번호 확인" variant="outlined" type="password" />
      <TextField autoComplete='off' size="small" id="name" label="이름" variant="outlined" placeholder="본명을 입력해주세요." />
      <ToggleButtonGroup
        className="w-full"
        value={gender}
        exclusive
        onChange={handleGender}
        color="primary"
      >
        <ToggleButton className="w-full" value="man">
          남자
        </ToggleButton>
        <ToggleButton className="w-full" value="woman">
          여자
        </ToggleButton>
      </ToggleButtonGroup>
      {/* 생년월일 */}
      <TextField autoComplete='off' size="small" id="phone" label="휴대폰 번호" variant="outlined" placeholder="숫자만 입력해주세요 ex)00011116666" />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">유입경로</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={funnels}
          label="유입경로"
          onChange={handleChange}
        >
          {funnelsArray.map((funnel, index) => {
            return (
              <MenuItem key={index} value={funnel}>{funnel}</MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <div className="flex flex-col">
        <FormControlLabel required control={<Checkbox />} label="회칙 및 유의사항을 읽었습니다." />
        <Link href="#" target="_blank">회칙 확인</Link>
      </div>

      <Button variant="contained" type="submit">회원가입 완료하기</Button>
    </div>
  )
}
