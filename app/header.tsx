
import Button from '@mui/material/Button';
import { Instagram } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png'

export const Header = () => {
  return (
    <div className="mx-auto flex items-center justify-between text-center w-full">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={40} height={40} />
        </Link>

        <Button variant='outlined' className="ml-4">활동 사진 보러가기 <Instagram sx={{ fontSize: 16 }} color="secondary" /></Button>
      </div>

      <div className="flex space-x-2">
        <Link href="/register">
          <Button variant="text">회원가입</Button>
        </Link>
        <Link href="/login">
          <Button variant="contained">로그인</Button>
        </Link>
      </div>
    </div>
  )
}