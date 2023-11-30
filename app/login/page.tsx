import { Button, TextField } from "@mui/material"
import Link from "next/link"

export default function Login() {
  return (
    <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">
      <TextField id="email" label="아이디" variant="outlined" />
      <TextField id="password" label="비밀번호" variant="outlined" className="mt-4" />
      <Link href="#" className="text-xs text-right mt-8 ">비밀번호를 잊으셨나요?</Link>
      <Button variant="contained" className="mt-4">로그인</Button>
    </div>
  )
}
