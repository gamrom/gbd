'use client';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function FindPwPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      console.log(values.email)
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '비밀번호 재설정 메일을 전송했습니다.',
            showConfirmButton: false,
            willClose: () => {
              location.href = '/'
            }
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    },

  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">
        <TextField id="email" name="email" value={formik.values.email} onChange={formik.handleChange} label="이메일" variant="outlined" />
        <Button type="submit" variant="contained" className="mt-4">비밀번호 재설정</Button>
      </div>
    </form>
  )
}