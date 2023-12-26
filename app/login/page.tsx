'use client';

import { Button, TextField } from "@mui/material"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import React from 'react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      pw: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      signInWithEmailAndPassword(auth, values.email, values.pw)
        .then((userCredential: any) => {
          // Signed in
          //메인페이지로 이동
          window.location.href = "/";
        })
        .catch((error: any) => {
          if (error.code === "auth/too-many-requests") {
            Swal.fire({
              icon: 'error',
              title: '로그인에 실패하였습니다.',
              text: '시도가 너무 많습니다. 비밀번호를 재설정해주세요',
              showConfirmButton: true,
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: '로그인에 실패하였습니다.',
              text: '아이디와 비밀번호를 확인해주세요.',
              showConfirmButton: true,
            })
          }

          setSubmitting(false);
        });
    },
  });



  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col mx-auto mt-[100px] max-w-[360px]">
        <TextField InputLabelProps={{ shrink: true }} id="email" name="email" value={formik.values.email} onChange={formik.handleChange} label="아이디" variant="outlined" />
        <TextField InputLabelProps={{ shrink: true }} id="pw" name="pw" type="password" value={formik.values.pw} onChange={formik.handleChange} label="비밀번호" variant="outlined" className="mt-4" />
        <div onClick={() =>
          Swal.fire({
            icon: 'success',
            title: '아이디를 잊으셨나요?',
            text: '아이디를 잊으셨다면, 관리자에게 문의해주세요.',
            showConfirmButton: true,
          })
        } className="text-xs text-right ml-auto mt-4 cursor-pointer w-fit">아이디를 잊으셨나요?</div>
        <Link href="/find_pw" className="text-xs ml-auto text-right mt-[2px] no-underline cursor-pointer text-black w-fit">비밀번호를 잊으셨나요?</Link>
        <Button disabled={formik.isSubmitting} type="submit" variant="contained" className="mt-4">로그인</Button>
        <Button variant="outlined" className="text-center mt-4">
          <Link href="/register" className="no-underline text-black">회원가입</Link>
        </Button>
        <div className="my-2 mx-auto font-bold text-[#FF0000]">회원만 감보동에 지원하실 수 있습니다.</div>
      </div>
    </form>
  )
}
