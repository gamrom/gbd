'use client';

import { Button, TextField } from "@mui/material"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import React from 'react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/')
      }
    })
  }, [])

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      pw: '',
    },
    onSubmit: (values) => {
      console.log(values.email)
      console.log(values.pw)
      console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

      signInWithEmailAndPassword(auth, values.email, values.pw)
        .then((userCredential: any) => {
          // Signed in
          console.log(userCredential);
          var user = userCredential.user;
          //메인페이지로 이동

          router.push('/');
          // ...
        })
        .catch((error: any) => {
          console.log(error);
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
  });



  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">

        <TextField id="email" name="email" value={formik.values.email} onChange={formik.handleChange} label="아이디" variant="outlined" />
        <TextField id="pw" name="pw" type="password" value={formik.values.pw} onChange={formik.handleChange} label="비밀번호" variant="outlined" className="mt-4" />
        <Link href="/find_pw" className="text-xs text-right mt-8 ">비밀번호를 잊으셨나요?</Link>
        <Button type="submit" variant="contained" className="mt-4">로그인</Button>
      </div>
    </form>
  )
}
